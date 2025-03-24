// This script launches the simpler frontend-only server
import { exec } from 'child_process';

console.log('Starting frontend-only server...');
exec('tsx server/clean-server.ts', { stdio: 'inherit' }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});