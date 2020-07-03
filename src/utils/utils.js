var timeUtils = {
    timeStampConvert: function(timeStamp){
                    let dateObj = new Date(timeStamp);
                    let year = dateObj.getYear() + 1900;
                    let month = dateObj.getMonth() + 1;
                    let theDate = dateObj.getDate();
                    let hour = dateObj.getHours();
                    let minute = dateObj.getMinutes();
                    let second = dateObj.getSeconds();
                    return (
                        year +
                        "-" +
                        month +
                        "-" +
                        theDate +
                        " " +
                        hour +
                        ":" +
                        minute +
                        ":" +
                        second
                    );
    }
}

export {
    timeUtils
}