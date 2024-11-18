function triggerRefresh() {
    const channel = new BroadcastChannel('page_refresh_channel');
    channel.postMessage('refresh');
}