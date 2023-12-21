
$(document).ready(() => {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/chirps/",
        dataType: 'JSON'
    }).done(chirps => Object.entries(chirps).forEach(chirp => {
        if (chirp[1].user && chirp[1].text)
            createChirp(chirp[1].user, chirp[1].text, chirp[0]);
    }))

    
});

$('.submit').on('click', (e) => {

    e.preventDefault();
    if (!($('.chirpUser').val() && $('.chirpText').val()))
        return
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/api/chirps/",
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ user: $('.chirpUser').val(), text: $('.chirpText').val() }),
    }).done((res)=>{
        console.log(res)
    });
    $('.chirpContainer').empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/chirps/",
        dataType: 'JSON'
    }).done(chirps => Object.entries(chirps).forEach(chirp => {
        if (chirp[1].user && chirp[1].text)
            createChirp(chirp[1].user, chirp[1].text, chirp[0]);
    }))
    $('.chirpUser').val('');
    $('.chirpText').val('');


})

function createChirp(user, text, id) {
    let chirp = $(chirpContents(user, text, id))
    
    chirp.on('click', '#close', e => {
        chirp.remove();
        $.ajax({
            type: "DELETE",
            url: "http://localhost:3000/api/chirps/" + id,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    }).on('click', e => {
        if(e.target.id === 'close') return;

        let modal = $('#modal');
        let closeModal = $('#submitModal');

        modal.css('display', 'block');

        closeModal.one('click', e => {
            e.preventDefault();
            modal.css('display', 'none');
            $.ajax({
                type: "PUT",
                url: "http://localhost:3000/api/chirps/" + id,
                data: JSON.stringify({ user: $('#userModal').val(), text: $('#textModal').val() }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            location.reload();
        });

    })
    chirp.appendTo('.chirpContainer')
}


function chirpContents(user, text, id) {

    return (`<div data-modal-target="authentication-modal"  id=${id} class="bg-slate-300 max-w-md flex shadow-md rounded-md m-5 p-3">
            <img id="close" src="images/close.png" alt="delete chirp" class="close max-h-6 max-w-6 mr-3 relative inline " />
            <div class="flex-col chirpBody">
                <h1 id="chirpUserInline" class="border-b-slate-400 border text-xl">@${user}</h1>
                <p id="chirpTextInline" class="text-md mb-4 break-all chirpText">${text}</p>
                <small class="text-xs">${new Date()}</small>
            </div>
        </div>`)

}