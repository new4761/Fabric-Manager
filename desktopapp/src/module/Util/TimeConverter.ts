class TimeConverter {
  convertTime(unix: number) {
    let dateNow: number = Date.now();
    //  console.log(new Date(unix).getDate());
    let dayNow = new Date(dateNow).getTime();
    let dayUpdate = new Date(unix).getTime();
    return this.msToTime(dayNow - dayUpdate);
  }
  msToTime(s: number) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = ((s - mins) / 60) % 24;
    var day = Math.round((s - mins) / 60 / 24);
    if (day >= 1) {
      return day + " " + "Days ago";
    } else if (hrs >= 1) {
      return hrs + " " + "Hours ago";
    } else {
      return mins + " " + "Mins ago";
    }
  }

  convertDate(unix: number) {
    var date = new Date(unix).toLocaleDateString('en-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    return date;
  }
}
export default new TimeConverter();
