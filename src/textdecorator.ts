import * as moment from 'moment';

export class TextDecorator {

    toTextView(commit: Object) : string {
        const dateNow = new Date();
        const author = commit['author'];
        const dateText = this.toDateText(dateNow, new Date(author['timestamp'] * 1000));

        if (commit['hash'] === '0000000000000000000000000000000000000000') {
            return author['name'];
        }
        else {
            return 'Blame ' + author['name'] + ' ( ' + dateText + ' )';
        }
    }

    toDateText(dateNow: Date, dateThen: Date) : string {

        const momentNow = moment(dateNow);
        const momentThen = moment(dateThen);

        const months = momentNow.diff(momentThen, 'months');
        const days = momentNow.diff(momentThen, 'days');
        const hours = momentNow.diff(momentThen, 'hours');
        const minutes = momentNow.diff(momentThen, 'minutes');

        if (minutes <= 4) {
            return 'right now';
        }
        else if (minutes <= 70) {
            return minutes + ' minutes ago';
        }
        else if (hours <= 47) {
            return hours + ' hours ago';
        }
        else if (days <= 40) {
            return days + ' days ago';
        }
        else {
            return months + ' months ago';
        }
    }
}
