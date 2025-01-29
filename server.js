const axios = require('axios');

const eventStatements = (data)=>{
    switch (data.type) {
        case 'PushEvent':
            return `Pushed ${data.payload.commits.length} commit/s to ${data.repo.name} with id ${data.id}`;
        case 'CreateEvent':
            return `Created ${data.payload.ref_type} ${data.repo.name}`;
        case 'DeleteEvent':
            return `Deleted ${data.type} ${data.ref}`;
        case 'WatchEvent':
            return `Starred ${data.repo.name}`;
        case 'IssuesEvent':
            return `${data.action} issue on ${data.repo.name}`;
        case 'IssueCommentEvent':
            return `${data.action} comment on issue ${data.issue.number} on ${data.repository.name}`;
        case 'ForkEvent':
            return `Forked ${data.payload.forkee.full_name}`;
        case 'PullRequestEvent':
            return `${data.action} pull request #${data.number} on ${data.repository.name}`;
        case 'ReleaseEvent':
            return `${data.action} release ${data.release.tag_name} on ${data.repository.name}`;
        default:
            return `Perfomed ${data.type} on ${data.repo.name}`;
    }
}

const getActivity = async (username) => {
    const url = `https://api.github.com/users/${username}/events`;
    try {
        const {data} = await axios.get(url);
        if(!data) console.log('No activity found for the user');
        data.forEach(event => {
            console.log(`- ${eventStatements(event)}`);
        });
    } catch (error) {

        console.error('Error fetching GitHub activity' , error);
    }
};

const runCLI = async () => {
    const inquirer = (await import('inquirer')).default;
    inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'Enter GitHub username:',
            validate: (input) => input ? true : 'UserName cannot be empty'
        },
    ]).then( async answers => {
        await getActivity(answers.username);
    });
    
};

runCLI();
