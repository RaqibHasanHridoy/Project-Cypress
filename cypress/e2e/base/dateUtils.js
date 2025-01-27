class dateUtils {

    static currentDateWithDay() {
        const currentDate = new Date();
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-GB', options).replace(/(\w+), (\d{2}) (\w{3}) (\d{4})/, '$1 $3 $2 $4');
        return formattedDate;
    }


}

export default dateUtils;