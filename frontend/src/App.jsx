import { AuthClient } from '@dfinity/auth-client';
import { createActor } from 'declarations/backend';
import { canisterId } from 'declarations/backend/index.js';
import React, { useEffect, useContext } from 'react';
import '../index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import { UniContext } from './context';

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app' // Mainnet
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943'; // Local

function App() {
  const {isAuthenticated, setIsAuthenticated, authClient, setAuthClient, setFiles, setErrorMessage, actor, setActor} = useContext(UniContext);

  useEffect(() => {
    updateActor();
    setErrorMessage();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadFiles();
    }
  }, [isAuthenticated]);

  async function updateActor() {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const actor = createActor(canisterId, {
      agentOptions: {
        identity
      }
    });
    const isAuthenticated = await authClient.isAuthenticated();

    setActor(actor);
    setAuthClient(authClient);
    setIsAuthenticated(isAuthenticated);
  }

  async function login() {
    await authClient.login({
      identityProvider,
      onSuccess: updateActor
    });
  }

  async function logout() {
    await authClient.logout();
    updateActor();
  }

  async function loadFiles() {
    try {
      const fileList = await actor.getFiles();
      setFiles(fileList);
    } catch (error) {
      console.error('Failed to load files:', error);
      setErrorMessage('Failed to load files. Please try again.');
    }
  }

  return (
    <BrowserRouter>
      <div className="container mx-auto p-4">
        <div className="flex flex-row justify-between">
          <a href="/"><h1 className="mb-4 text-2xl font-bold">On-chain Space</h1></a>

          {isAuthenticated ? (
            <button onClick={logout} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Logout
            </button>
          ) : (
            <button onClick={login} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Login with Internet Identity
            </button>
          )}
        </div>

        <Routes>
          <Route index element={
            <>
              <section class="flex flex-col items-center justify-center h-[85vh] text-center px-4">
                <h1 class="text-4xl font-bold mb-4">File Storage that is all decentralized</h1>
                <p class="text-lg mb-6">We provide ICP based digital storage for your precious documents and files.</p>
                {
                  isAuthenticated ? <>
                    <a href="/dashboard" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Dashboard</a>
                  </> : 
                  <>
                    <button onClick={login} class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Get Started</button>
                  </>
                }
              </section>
            </>
          } />
          <Route path='dashboard' element={<Dashboard />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
