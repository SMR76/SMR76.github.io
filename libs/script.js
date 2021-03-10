$(document).ready(() => {
    let url = "https://api.github.com/users/smr76/repos";

    $.get(url).then((data) => {
        initializeRepositories(data);
    });

    initEvents();
});

async function initializeRepositories(repoList) {
    for (const repoInfo of repoList) {
        repoAppender(repoInfo);
    }
}

async function repoAppender(repoInfo) {
    let rposContainer = $("#repositories");
    let tag = "";

    await $.get(repoInfo.tags_url).then((data)=>{            
            if(data.length > 0)
                tag = data[data.length-1].name;
        });
    
    var repoFormat =
        `<div class="row pt-1 pb-1 rounded"><div class="col-12 col-md-6 small text-left">
        <a class="alert no-text-deco text-dark text-capitalize" href="${repoInfo.html_url}" target="_blank">
        ${repoInfo.name}
        ${repoInfo.fork == true? '<sub class="text-primary">forked</sub>' : ''}</a>
        <span  class="badge badge-dark">${tag}</span>
        </div><div class="col-12 pt-2 pt-md-0 col-md-6 small text-muted text-left">
        ${repoInfo.description != null? repoInfo.description : "no description."}
        </div></div></div>`;
    
    rposContainer.append(repoFormat);   
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

    // navbar scroll spy
    $("#navbarNavBrand,#navbarNav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 800, function () {
                if (history.pushState) {
                    history.pushState(null, null, hash);
                }
                else {
                    location.hash = hash;
                }
            });
        }
    });

    setTimeout(() => {
        let message = $("#welcomeMessage");
        message.slideUp();
    },15000);
}