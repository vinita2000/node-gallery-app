$("button[target='gallery']").click(function () {
    window.location = "/gallery";
});

$("button[target='folders']").click(function () {
    window.location = "/folders";
});

$("button[target='favourites']").click(function () {
    window.location = "/favourites";
});

function getSessionData(){
    const _id = sessionStorage.getItem('userID');
    if(!_id){
        throw new Error('Session data extraction failed');
    }
    return _id;
}

const _id = getSessionData();
// $('#fileUploadForm').attr('action') = `/user/upload-image/${_id}`;
$('#fileUploadForm').attr('action', `/user/upload-image/${_id}`);

