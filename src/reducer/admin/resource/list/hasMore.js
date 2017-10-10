import { CRUD_GET_LIST_SUCCESS } from '../../../../actions/dataActions';

export default resource => (
    previousState = false,
    { type, payload, requestPayload, meta }
) => {
    if (!meta || meta.resource !== resource) {
        return previousState;
    }
    if (type === CRUD_GET_LIST_SUCCESS) {
        const nbPage =
            Math.ceil(payload.total / requestPayload.pagination.perPage) || 1;
        return requestPayload.pagination.page < nbPage;
    }
    return previousState;
};
