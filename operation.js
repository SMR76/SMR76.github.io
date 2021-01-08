$(document).ready(() => {

    $.getJSON("./info.json",(data)=>{
        initializeSkills(       data["skillList"]   );
        initializeRepositories( data["repoList"]    );
        initializeSidebarLinks( data["soucialList"] );
    }).fail(() => {
        alert("fail to initialize json data, please refresh browser tab.")
    });
    
    initEvents();
});

function initializeSkills(skillList) {  
    
    var skillsContainer = $("#skills");

    for(var i in skillList) {
        var skillFormat = 
        `<div class="row">
        <div class="col-3 h-100 mt-1 small text-right text-muted">${skillList[i].skill}</div>
        <div class="col-9 mt-1"><div class="progress">
        <div class="progress-bar bg-dark" role="progressbar"
            style="width: ${skillList[i].master}%" aria-valuenow="${skillList[i].master}" 
            aria-valuemin="0" aria-valuemax="100">${skillList[i].master >= 10 ? skillList[i].master + '%' : ''}
        </div></div></div></div>`;

        skillsContainer.append(skillFormat);
    }
}

function initializeRepositories(repoList) {  

    var rposContainer = $("#repositories");

    for(var i in repoList) {
        var repoFormat = 
        `<div class="row pt-1 pb-1 ${i % 2 == 0 ? 'bg-light' : ''}"><div class="col-6 small text-left">
        <a class="alert no-text-deco text-dark" href="${repoList[i].link}" target="_blank">${repoList[i].name}
        </a><span class="badge badge-dark">v ${repoList[i].ver}</span>
        </div><div class="col-6 small text-muted text-left">${repoList[i].describe}</div></div></div>`;

        rposContainer.append(repoFormat);
    }
}

function initializeSidebarLinks(soucialList) {    
    var idPostFix = "SB";

    var sidebarContainer = $("#sidebar");

    for(var i in soucialList) {
        var id = soucialList[i].id +   idPostFix;
        var soucialIconFormat =  
        `<div class="row justify-content-end "><div class="col-8 text-right p-0">
        <a id="${id}" class=" text-dark ${soucialList[i].icoClass} smrTooltip " ${soucialList[i].attr} rel="sidebar">
        <span class="smrTooltipText small mt-1 pr-2">${soucialList[i].text}</span></a>
        </div></div>`;

        sidebarContainer.append(soucialIconFormat);
    }

}

function initEvents() {

    // bookmark button
    $('#bookSB').click(() => {
        if (window.sidebar) { // Mozilla Firefox Bookmark
            window.sidebar.addPanel(location.href,document.title,"");
            return true;
        } else if(window.external) { // IE Favorite
            window.external.AddFavorite(location.href,document.title); 
            return true;
        }
        else if(window.opera && window.print) { // Opera Hotlist
            var elem = document.createElement('a');
            elem.setAttribute('href', url);
            elem.setAttribute('title', title);
            elem.setAttribute('rel', 'sidebar');
            elem.click(); //this.title=document.title;
            return true;
        }
    });
}

