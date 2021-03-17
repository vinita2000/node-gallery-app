function getSessionData() {
    const token = sessionStorage.getItem('userToken');
    const _id = sessionStorage.getItem('userID');
    if(!token || !_id){
        throw new Error('Session data extraction failed');
    }
    return {token, _id};
}

const getUserImages = (data) => {
    $.ajax({
        method: 'GET',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", data.token);
        },
        url: `/user/get-user-images/${
            data._id
        }`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success(res) {
            renderUserImages(res.data);
        },
        error(e) {
            alert('Failed to load Gallery');
        }
    });
};

// display user images
const renderUserImages = (images) => {
    const imgExt = ['JPEG', 'JPG', 'PNG', 'GIF'];
    const videoExt = ['MP4', 'MOV', 'AVI', 'MPEG4'];
    let html = `
        <tr>
            <th>Image</th>
            <th>Directory</th>
            <th>Option</th>
            <th>Option</th>
        </tr>
    `;
    for (const image of images) {
        const currExt = image.key.split('.').pop().toUpperCase();
        if (imgExt.includes(currExt)) { // it is a image file
            html += `
            <tr>
                <td><img src="https://gallery-vinita.s3.ap-south-1.amazonaws.com/${image.key}" alt="user-image"></td>`;
        } else if (videoExt.includes(currExt)) { // it is video file
            html += `
            <tr>
                <td><video width="250" height="250" controls>
                    <source src="https://gallery-vinita.s3.ap-south-1.amazonaws.com/${image.key}" type="video/${currExt.toLowerCase()}">
                    Your browser does not support the video tag.
                </video></td>
            `;
        }
        html += `
                <td><span>${image.directory.toUpperCase()}</span></td>
                <td><button id="delete${image._id}" class="removeBtn">Delete</button></td>
                <td><button id="setFavourite${image._id}" class="favouriteBtn">Set Favourite</button></td>
            </tr>
        `;
    }

    $("table[target='imagesTable']").html(html);
    $(".removeBtn").click(function () {
        deleteImageBtnHandler(this.id.replace('delete', ''));
    });
    $(".favouriteBtn").click(function () {
        favouriteImageBtnHandler(this.id.replace('setFavourite', ''));
    });
};

// delete user image
const deleteImageBtnHandler = (imgId) => {
    const data = {
        imgId
    }
    const sessionData = getSessionData();
    $.ajax({
        method: 'DELETE',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", sessionData.token);
        },
        url: `/user/delete-user-images/${
            sessionData._id
        }`,
        data: data,
        dataType: 'json',
        success(res) {
            starterFunction1();
        },
        error(e) {
            alert('Failed to delete Image');
        }
    });
};
// mark image as favourite
const favouriteImageBtnHandler = (imgId) => {
    const data = {
        imgId,
        favourite: true
    };
    const sessionData = getSessionData();
    $.ajax({
        method: 'PUT',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", sessionData.token);
        },
        url: `/user/set-favourite/${sessionData._id}`,
        data: data,
        dataType: 'json',
        success(res) {
            alert('Image has been set to favourite !!');
        },
        error(e) {
            alert('Failed set Image as favourite');
        }
    });
};

function starterFunction1() {
    const data = getSessionData();
    getUserImages(data);
}

starterFunction1();
