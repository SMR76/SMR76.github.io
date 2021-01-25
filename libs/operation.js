$(document).ready(() => {
    var url = "https://api.github.com/users/smr76/repos";

    $.getJSON("libs/info.json", (data) => {
        initializeSkills(data["skillList"]);
        initializeSidebarLinks(data["soucialList"]);
    }).fail(() => {
        alert("fail to initialize json data, please refresh browser tab.")
    });

    $.get(url).then((data) => {
        initializeRepositories(data);
    });

    initEvents();
});

function initializeSkills(skillList) {
    var skillsContainer = $("#skills");

    for (const skill of skillList) {
        var skillFormat =
            `<div class="row">
            <div class="col-3 h-100 mt-1 small text-right text-muted">${skill.skill}</div>
            <div class="col-9 mt-1"><div class="progress">
            <div class="progress-bar bg-dark" role="progressbar"
                style="width: ${skill.master}%" aria-valuenow="${skill.master}" 
                aria-valuemin="0" aria-valuemax="100">${skill.master >= 10 ? skill.master + '%' : ''}
            </div></div></div></div>`;

        skillsContainer.append(skillFormat);
    }
}

async function initializeRepositories(repoList) {
    var rposContainer = $("#repositories");

    var cToggle = false;

    for (const repoInfo of repoList) {
        var tag = "";
        cToggle = !cToggle;

        await $.get(repoInfo.tags_url).then((data)=>{            
                if(data.length > 0)
                    tag = data[data.length-1].name;
            });
        
        var repoFormat =
            `<div class="row pt-1 pb-1 ${cToggle ? 'bg-light' : ''}"><div class="col-6 small text-left">
            <a class="alert no-text-deco text-dark text-capitalize" href="${repoInfo.html_url}" target="_blank">
            ${repoInfo.name}
            ${repoInfo.fork == true? '<sub class="text-primary">forked</sub>' : ''}</a>
            <span  class="badge badge-dark">${tag}</span>
            </div><div class="col-6 small text-muted text-left text-capitalize">
            ${repoInfo.description != null? repoInfo.description : "no description."}
            </div></div></div>`;
        
        rposContainer.append(repoFormat);
    }
}

function initializeSidebarLinks(soucialList) {    
    var idPostFix = "SB";
    var sidebarContainer = $("#sidebar");

    for(const soucial of soucialList) {
        var soucialIconFormat =  
            `<div class="row justify-content-end "><div class="col-8 text-right p-0">
            <a id="${soucial.id + idPostFix}" class=" text-dark ${soucial.icoClass} smrTooltip " ${soucial.attr} rel="sidebar">
            <span class="smrTooltipText small mt-1 pr-2">${soucial.text}</span></a>
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