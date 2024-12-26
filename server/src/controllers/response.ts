class APIResponse {
    protected success = { code: 0, message: 'success', data: {} }
    protected failure = { code:  -1, message: 'failed', data: {} }
}

export default APIResponse