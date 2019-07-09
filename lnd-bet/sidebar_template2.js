function toggleSidebar() {
    // fires when the user wants to expand or collapse the sidebar
    const icon = document.querySelector('#menuicon');
    const isCollapsed = document.body.classList.contains('sidebar-mini');
    if (isCollapsed) {
        // if it's collapsed, then expand
        document.body.classList.remove('sidebar-mini');
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.querySelector('.page-content').style.marginLeft = '200px'
    } else {
        // if it's not collapsed, then collapse
        document.body.classList.add('sidebar-mini');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.querySelector('.page-content').style.marginLeft = '75px'
    }
}

function getMarkets() {
    // todo: actually call the api
    // https://cw39hliu4m.execute-api.us-east-1.amazonaws.com/prod
    return {"markets":[{"market_end":"2019-06-17T07:00:00Z","options":["Gary Woodland","Justin Rose","Other"],"market_id":1,"name":"2019 US Open (Golf) Winner"}]}
}

function updateTiles() {
    
}

document.addEventListener("DOMContentLoaded", function(){
    document.querySelector('.menu-icon').addEventListener('click', toggleSidebar);
});
