import React, { useEffect, useState } from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';

function App() {
  const { kit } = useContractKit();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const contract = await kit.contracts.getContract('CrowdsourcedFunding');
      const projectCount = await contract.getProjectCount();

      const fetchedProjects = [];

      for (let i = 0; i < projectCount; i++) {
        const project = await contract.getProject(i);
        fetchedProjects.push(project);
      }

      setProjects(fetchedProjects);
    }

    fetchProjects();
  }, [kit]);

  return (
    <div>
      <h1>Crowdsourced Funding DApp</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.elements.title.value;
          const goalAmount = e.target.elements.goalAmount.value;
          const nftTokenId = e.target.elements.nftTokenId.value;
          createProject(title, goalAmount, nftTokenId);
        }}
      >
        <input type="text" name="title" placeholder="Project Title" required />
        <input type="number" name="goalAmount" placeholder="Goal Amount" required />
        <input type="number" name="nftTokenId" placeholder="NFT Token ID" required />
        <button type="submit">Create Project</button>
      </form>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <strong>{project.title}</strong> by {project.creator}
            <br />
            Goal: {project.goalAmount} | Current: {project.currentAmount}
            <br />
            {project.nftTokenId && <p>NFT Reward: Token ID {project.nftTokenId}</p>}
            <button onClick={() => contribute(index, 100)}>Contribute</button>
          </li>
        ))}
      </ul>
    </div>
  );
  
  
}

export default App;
async function createProject(title, goalAmount) {
  const { kit } = useContractKit();
  const contract = await kit.contracts.getContract('CrowdsourcedFunding');
  await contract.createProject(title, goalAmount);
}

async function contribute(projectId, amount) {
  const { kit, address } = useContractKit();
  const contract = await kit.contracts.getContract('CrowdsourcedFunding');
  await contract.contribute(projectId, { value: amount, from: address });
}


export { createProject, contribute };
