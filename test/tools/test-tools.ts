import { execSync } from 'child_process';
import { mkdirSync } from 'fs';

export function fixMessage(msg?: string)
{
	if (!msg || typeof msg !== 'string')
	{
		msg = 'Test commit'
	}
	// we need to escape backtick for bash but not for windows
	// probably this should be done in git-dummy-commit or shelljs
	if (process.platform !== 'win32')
	{
		msg = msg.replace(/`/g, '\\`')
	}
	return `"${msg}"`
}

export function prepareMessageArgs(msg: string | string[])
{
	const args = []
	if (Array.isArray(msg))
	{
		if (msg.length > 0)
		{
			for (const m of msg)
			{
				args.push('-m', fixMessage(m))
			}
		}
		else
		{
			args.push('-m', fixMessage())
		}
	}
	else
	{
		args.push('-m', fixMessage(msg))
	}
	return args
}

export function exec(command: string)
{
	return execSync(command, {
		stdio: 'pipe',
		encoding: 'utf-8'
	})
}

export function gitDummyCommit(msg: string | string[])
{
	const args = prepareMessageArgs(msg)

	args.push(
		'--allow-empty',
		'--no-gpg-sign'
	)

	return exec(`git commit ${args.join(' ')}`)
}

export function gitInit()
{
	mkdirSync('git-templates')
	return exec('git init --template=./git-templates')
}
