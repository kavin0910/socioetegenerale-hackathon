import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { auth, firestore } from './firebaseConfig';
import LegalRecords from './contracts/LegalRecords.json';
import Auth from './Auth';

function App() {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [records, setRecords] = useState([]);
    const [documentHash, setDocumentHash] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                loadBlockchainData();
            } else {
                setUser(null);
            }
        });
    }, []);

    const loadBlockchainData = async () => {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000');
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        if (networkId === 11155111) {  // Sepolia network ID
            const networkData = LegalRecords.networks[networkId];
            if (networkData) {
                const legalRecords = new web3.eth.Contract(LegalRecords.abi, networkData.address);
                setContract(legalRecords);
                const recordCount = await legalRecords.methods.recordCount().call();
                for (let i = 1; i <= recordCount; i++) {
                    const record = await legalRecords.methods.records(i).call();
                    setRecords((prevRecords) => [...prevRecords, record]);
                }
            } else {
                alert('Smart contract not deployed on the detected network.');
            }
        } else {
            alert('Please connect to the Sepolia network.');
        }
    };

    const uploadRecord = async (e) => {
        e.preventDefault();
        if (contract) {
            await contract.methods.uploadRecord(documentHash).send({ from: account });
            const recordCount = await contract.methods.recordCount().call();
            const record = await contract.methods.records(recordCount).call();
            setRecords((prevRecords) => [...prevRecords, record]);
            firestore.collection('records').add({
                documentHash: documentHash,
                uploader: account,
                timestamp: new Date().toISOString(),
            });
        }
    };

    return (
        <div>
            <h1>eVault System</h1>
            {user ? (
                <>
                    <p>Account: {account}</p>
                    <form onSubmit={uploadRecord}>
                        <input
                            type="text"
                            value={documentHash}
                            onChange={(e) => setDocumentHash(e.target.value)}
                            placeholder="Document Hash"
                        />
                        <button type="submit">Upload Record</button>
                    </form>
                    <h2>Records</h2>
                    <ul>
                        {records.map((record, index) => (
                            <li key={index}>
                                <p>Hash: {record.documentHash}</p>
                                <p>Uploader: {record.uploader}</p>
                                <p>Timestamp: {new Date(record.timestamp * 1000).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <Auth />
            )}
        </div>
    );
}

export default App;
