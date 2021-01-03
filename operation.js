$(document).ready(() => {
    initializeSkills();
    initializeRepositories();
    initializeSidebarLinks();
    initEvents();
});

function initializeSkills() {    
    var skillList = [
        {skill:'Painting'        ,master: 11},
        {skill:'Illustrator',master: 10},
        {skill:'C++'        ,master: 6},
        {skill:'Qt/Qml'     ,master: 5},
        {skill:'C'          ,master: 4}
    ];

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

function initializeRepositories() {    
    var repoList = [
        {
            name:'Car Alarm',
            link:'https://github.com/SMR76/Car_Alarm',
            ver: '0.2',
            describe:'this project based on designing hardware that installs in your car and helps to protect the vehicle against thieves and have better control over it.'
        },{
            name:'Class Scheduler',
            link:'https://github.com/SMR76/class-scheduler',
            ver: '0.3',
            describe:'a simple program with generic algorithm to show availability and conflicts for classes in a semester.'
        },{
            name:'Subtitle Fixer',
            link:'https://github.com/SMR76/persian-subtitle-fixer',
            ver: '1.0',
            describe:'a user-friendly program that converts Window-1256 charset to UTF-8.'
        }
    ];

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

function initializeSidebarLinks() {    
    var soucialList = [
        {
            id:'github',   icoClass: 'bi bi-github',               
            attr:'target="_blank" href="https://github.com/SMR76"' ,
            text:'Follow my GitHub page',
            obj: []
        },{
            id:'instagram',icoClass: 'bi bi-instagram',            
            attr:'target="_blank" href="https://www.instagram.com/s_m_r67/"' ,
            text:'Follow my Instagram page',
            obj: []
        },{
            id:'twitter',icoClass: 'bi bi-twitter',            
            attr:'target="_blank" href="https://twitter.com/S_M_R_67"' ,
            text:'Follow my Twitter page',
            obj: []
        },{
            id:'linkedin', icoClass: 'bi bi-linkedin',             
            attr:'target="_blank" href="https://www.linkedin.com/in/seyyed-morteza-razavi-403b2a196" ' ,
            text:'Follow my Linkedin',
            obj: []
        },{
            id:'email',    icoClass: 'bi bi-envelope',             
            attr:'href="mailto:seyyedmortezarazavi76@gmail.com"' ,
            text:'Contact me',
            obj: []
        },{
            id:'telegram', icoClass: 'bi bi-telegram fixBi',       
            attr:'target="_blank" href="https://t.me/S_M_R0"' ,
            text:'Contact me at Telegram',
            obj: []
        },{
            id:'donate',   icoClass: 'bi bi-cup-fill',             
            attr:'href=""  ' ,
            text:'Buy me a coffee',
            obj: []
        },{
            id:'book',     icoClass: 'bi bi-bookmark-heart-fill',  
            attr:'href=""' ,
            text:'Bookmark my page',
            obj: []
        }
    ];

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

