var AndroidAsyncWork = {
    requestCallbacks: {},
    request: function (work, params) {
        let requestId = Android.requestAsyncWork(work, JSON.stringify(params), 'AndroidAsyncWork.onResponse')
        this.requestCallbacks[requestId] = {}
        return new Promise((resolve, reject) => {
            this.requestCallbacks[requestId].resolve = resolve
            this.requestCallbacks[requestId].reject = reject
        })
    },
    onResponse: function (requestId, isSuccess, response) {
        if (isSuccess) {
            this.requestCallbacks[requestId].resolve(response)
        } else {
            this.requestCallbacks[requestId].reject(response)
        }
        delete this.requestCallbacks[requestId]
    }
}