import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Function to spawn a process and pipe its output to the console
function spawnProcess(command, args, name) {
  const proc = spawn(command, args, {
    stdio: 'pipe',
    shell: true,
    cwd: process.cwd()
  });

  proc.stdout.on('data', (data) => {
    console.log(`[${name}] ${data.toString().trim()}`);
  });

  proc.stderr.on('data', (data) => {
    console.error(`[${name}] ${data.toString().trim()}`);
  });

  proc.on('error', (error) => {
    console.error(`[${name}] Error: ${error.message}`);
  });

  proc.on('close', (code) => {
    console.log(`[${name}] Process exited with code ${code}`);
  });

  return proc;
}

// Start the Node.js Express server
console.log('Starting Node.js Express server...');
const nodeServer = spawnProcess('tsx', ['server/index.ts'], 'Express');

// Start the .NET Core API
console.log('Starting .NET Core API...');
const dotnetServer = spawnProcess('dotnet', ['run'], 'DotNet API');
dotnetServer.cwd = join(__dirname, 'BSLTours.API');

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  nodeServer.kill();
  dotnetServer.kill();
  process.exit(0);
});