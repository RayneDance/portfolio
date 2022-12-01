window.onload = (even) => {
    let int  = setInterval(function(){
        let enddate = new Date('11/25/2040');
        let distance = enddate - Date.now();

        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;
        var _month = _day * 30;
        var _year = _day * 365;

        var years = Math.floor(distance / _year);
        var days = Math.floor((distance % _year) / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        let display = document.getElementById("timer");
        display.innerHTML = years + " years " + days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds.";
    }, 200);
};