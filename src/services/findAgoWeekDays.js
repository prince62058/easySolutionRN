export default findAgoWeekDays = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const d = new Date(date).getDay()
    const today = new Date().getDay()
    const d1 = new Date(date)


    let month = String(d1.getMonth());
    let day = String(d1.getDate());
    const year = String(d1.getFullYear());

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    // console.log("week day : ", d)

    if ( month == new Date().getMonth() && year == new Date().getFullYear()) {
        if (d === today) {
            return 'Today'
        } else if (d === today - 1) {
            return 'Yesterday'
        } else if (d < today - 1) {
            return days[d]
        }else {
            return `${day} ${months[d1.getMonth()]} ${year}`
        }
    }else {
        return `${day} ${months[d1.getMonth()]} ${year}`
    }

}