function initializeSkills() {    
    var skillList = [
        {skill:'C++'        ,master: 11},
        {skill:'C'          ,master: 4},
        {skill:'Qml'        ,master: 5},
        {skill:'Qt'         ,master: 3},
        {skill:'JS'         ,master: 1},
        {skill:'Illustrator',master: 10}
    ];

    var skillsContainer = $("#skills");

    for(var skill in skillList) {
        var skillFormat = 
        '<div class="row">'
        +   '<div class="col-3 h-100 mt-1 small text-right text-muted">'
        +   skillList[skill].skill
        +   '</div>'
        +   '<div class="col-9 mt-1"><div class="progress">'                
        +   '<div class="progress-bar bg-dark" role="progressbar" style="width: '
        +   skillList[skill].master
        +   '%" aria-valuenow="'+  skillList[skill].master
        +   '" aria-valuemin="0" aria-valuemax="100">' 
        +   (skillList[skill].master >= 10 ?skillList[skill].master + '%': '')
        +   '</div></div></div></div>';

        skillsContainer.append(skillFormat);
    }
}

$(document).ready(() => {
    initializeSkills();
    initEvents();
});

function initEvents() {

    // bookmark button
    $('#bookmarkme').click(() => {
        alert('hi');
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

