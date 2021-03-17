function getSessionData(){
    const token = sessionStorage.getItem('userToken');
    const _id = sessionStorage.getItem('userID');
    if(!token || !_id){
        throw new Error('Session data extraction failed');
    }
    return {token, _id};
}

// get user folders
const getUserDirectories = (data) => {
    $.ajax({
        method:'GET',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", data.token);
        },
        url:`/user/get-directories/${data._id}`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success(res){
            renderUserDirectories(res.data);
        },
        error(e){
            alert('Failed to load Gallery');
        }
    });
};

// renders products list on DOM
function renderUserDirectories(directories){
    const html = directories.map(directory=>`
        <button class="btn">${directory.toUpperCase()}</button>
    `)
    .join('');
    $(".outer2").html(html);
    $(".btn").click(function(){
        const directoryName = this.innerHTML.toLowerCase();
        getDirectoryImages(directoryName);
    });
}

// renders directory images
function getDirectoryImages(directory){
    const data = getSessionData();
    $.ajax({
        method:'GET',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", data.token);
        },
        url:`/user/directory-images/${data._id}/${directory}`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success(res){
            renderDirectoryImages(res.data);
        },
        error(e){
            alert('Failed to load Gallery');
        }
    });
}

function renderDirectoryImages(images){
    // const html = images.map(image=>`
    //     <img src="https://gallery-vinita.s3.ap-south-1.amazonaws.com/${image.key}"/>
    // `)
    // .join('');
    const imgExt = ['JPEG', 'JPG', 'PNG', 'GIF'];
    const videoExt = ['MP4', 'MOV', 'AVI', 'MPEG4'];
    let html = ``;
    for (const image of images) {
        const currExt = image.key.split('.').pop().toUpperCase();
        if (imgExt.includes(currExt)) { // it is a image file
            html += `
           <img src="https://gallery-vinita.s3.ap-south-1.amazonaws.com/${image.key}" alt="user-image">`;
        } 
        else if (videoExt.includes(currExt)) { // it is video file
            html += `
                <td><video width="250" height="250" controls>
                    <source src="https://gallery-vinita.s3.ap-south-1.amazonaws.com/${image.key}" type="video/${currExt.toLowerCase()}">
                    Your browser does not support the video tag.
                </video>
            `;
        }
    }
    $(".result").html(html);
}

function starterFunction3(){
    const data = getSessionData();
    getUserDirectories(data);
}

starterFunction3();