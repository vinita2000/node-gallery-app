function getSessionData(){
    const token = sessionStorage.getItem('userToken');
    const _id = sessionStorage.getItem('userID');
    if(!token || !_id){
        throw new Error('Session data extraction failed');
    }
    return {token, _id};
}

// get user favourite images
const getUserFavImages = (data) => {
    $.ajax({
        method:'GET',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", data.token);
        },
        url:`/user/get-favourite/${data._id}`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success(res){
            renderUserImages(res.data);
        },
        error(e){
            alert('Failed to load Gallery');
        }
    });
};

// renders products list on DOM
function renderUserImages(images){
    const imgExt = ['JPEG', 'JPG', 'PNG', 'GIF'];
    const videoExt = ['MP4', 'MOV', 'AVI', 'MPEG4'];
    let html = ``;
    for (const image of images) {
        html += `
        <div class="favImageDiv2">
            <div class="image-info">
        `;
        const currExt = image.key.split('.').pop().toUpperCase();
        if (imgExt.includes(currExt)) { // it is a image file
            html += `
           <img src="https://gallery-vinita.s3.ap-south-1.amazonaws.com/${image.key}" alt="user-image">
           `;
        } 
        else if (videoExt.includes(currExt)) { // it is video file
            html += `
                <video width="250" height="250" controls>
                    <source src="https://gallery-vinita.s3.ap-south-1.amazonaws.com/${image.key}" type="video/${currExt.toLowerCase()}">
                    Your browser does not support the video tag.
                </video>
            `;
        }
        html += `<span>${image.directory.toUpperCase()}</span>
                </div>
            </div>
        `;
    }

    $("#favImagesDiv").html(html);
}

function starterFunction2(){
    const data = getSessionData();
    getUserFavImages(data);
}

starterFunction2();