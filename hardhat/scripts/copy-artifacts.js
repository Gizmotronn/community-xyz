const fs = require('fs');
const path = require('path');

function copyArtifacts() {
    const artifactsDir = path.join(__dirname, '../artifacts/contracts');
    const frontendDir = path.join(__dirname, '../../artifacts');

    // Ensure frontend artifacts directory exists
    if (!fs.existsSync(frontendDir)) {
        fs.mkdirSync(frontendDir, { recursive: true });
    }

    const sourcePath = path.join(artifactsDir, 'CommunityReserve.sol/CommunityReserve.json');
    const destPath = path.join(frontendDir, 'CommunityReserve.json');

    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log('Copied CommunityReserve.json to frontend');
    } else {
        console.error('CommunityReserve artifact not found. Run yarn compile first.');
    }

    const deploymentSource = path.join(__dirname, '../deployment-info.json');
    const deploymentDest = path.join(frontendDir, 'deployment-info.json');

    if (fs.existsSync(deploymentSource)) {
        fs.copyFileSync(deploymentSource, deploymentDest);
        console.log('Copied deployment-info.json to frontend');
    }
}

copyArtifacts();