var shell = require(`shelljs`);

async function executeShellCommand(cmd, folderPath) {
    const toolUsed = cmd.split(` `)[0];
    if (!shell.which(toolUsed)) {
        shell.echo(`Please install ${toolUsed}, this can be a TODO`);
        // nshell.exit(1);
        console.error(`Please install ${toolUsed}, this can be a TODO`);
        return {
            code: 500,
            error: `Please install ${toolUsed}, this can be a TODO`,
        };
    } else {
        if(folderPath) {
            shell.cd(folderPath);
            console.log(shell.ls());
        }
        const executedCommand = shell.exec(
            cmd
        );

        if (executedCommand.code !== 0) {
            shell.echo(`Error: executeShellCommand (${cmd}) failed`);
            console.error(`${cmd} error`);
            // shell.exit(1);
            return {
                code: 500,
                error: `${cmd} error`,
            };
        } else {
            console.error(`${cmd} : OK`);
            console.log("executedCommand.stdout : %o", executedCommand.stdout);
            return {
                code: 200,
                data: executedCommand.stdout,
            };
        }
    }
}

module.exports = executeShellCommand;