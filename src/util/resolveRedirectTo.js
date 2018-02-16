import linkToRecord from './linkToRecord';

export default (redirectTo, basePath, id) => {
    switch (redirectTo) {
        case 'list':
            return basePath;
        case 'create':
            return `${basePath}/create`;
        case 'edit':
            return `${linkToRecord(basePath, id)}/edit`;
        case 'show':
            return linkToRecord(basePath, id);
        default:
            return redirectTo;
    }
};
