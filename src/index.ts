import {server} from './server/Server';

server.listen(process.env.PORT || 4444, () => console.log(`from index, in port ${process.env.PORT}`));