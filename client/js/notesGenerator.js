﻿export class NotesGenerator {

    generateRandomNotes(amount) {

      var notes = [];

        for (var i = 0; i < amount; i++) {
            var note = {
                title: "Test Title",
                description: "Test text Test text Test text Test text Test text",
                importance: this.getRandomNumber(0, 5),
                dueDate: moment(this.getRandomDate(2017, 2018)).utc(),
                creationDate: moment(this.getRandomDate(2017, 2017)).utc(),
                completionDate: null
            }

            if (this.isCompleted()) {
                note.completionDate = moment(this.getRandomDate(2018, 2018)).utc();
                note.completed = true;
            }

            notes.push(note);
        }

        return notes;
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    isCompleted() {
        return !!this.getRandomNumber(0, 1);
    }

    getRandomDate(minYear, maxYear) {
        var year = this.getRandomNumber(minYear, maxYear);
        var month = this.getRandomNumber(0, 11);
        var day = this.getRandomNumber(1, 31);

        return new Date(year, month, day);
    }
}

