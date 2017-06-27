import { changeTheme } from "./shared.js"
import { setTheme } from "./shared.js"

export class NoteMainController {

    constructor(model, view) {
        this._model = model;
        this._view = view;

        this._dom = this._view.getDOM();
        this._model.addObserver(this._view);
        this._model.addObserver(this);

        // Start
        setTheme(this._dom.themeDropdown);
        this._view.renderActionBar(1, true);
        this.setFilterAndSortingParameter();
        this.sortAndFilterNotes();
    }

    update() {
        this.registerHandlerOnDomElements();
    }

    registerHandlerOnDomElements() {

        for (let i = 0, len = this._dom.completeButtons.length; i < len; i++) {
            this._dom.completeButtons[i].addEventListener("click", this.completeNote.bind(this));
            this._dom.completeButtons[i].addEventListener("click", this.setFilterAndSortingParameter.bind(this));
        }

        for (let i = 0, len = this._dom.undoneButtons.length; i < len; i++) {
            this._dom.undoneButtons[i].addEventListener("click", this.undoneNote.bind(this));
            this._dom.undoneButtons[i].addEventListener("click", this.setFilterAndSortingParameter.bind(this));
        }

        this._dom.includingCompletedCheckBox().addEventListener("change", this.setFilterAndSortingParameter.bind(this));
        this._dom.includingCompletedCheckBox().addEventListener("change", this.sortAndFilterNotes.bind(this));
        this._dom.sortCriteriaDropDown().addEventListener("change", this.setFilterAndSortingParameter.bind(this));
        this._dom.sortCriteriaDropDown().addEventListener("change", this.sortAndFilterNotes.bind(this));
        this._dom.themeDropdown.addEventListener("change", changeTheme.bind(this));
    }

    setFilterAndSortingParameter() {
        this._model.setFilterAndSortingParameter(this._dom.sortCriteriaDropDown().value, this._dom.includingCompletedCheckBox().checked);
    }

    completeNote(event) {
        let id = event.currentTarget.dataset["noteId"];
        this._model.complete(id);
    }

    undoneNote(event) {
        let id = event.currentTarget.dataset["noteId"];
        this._model.undone(id);
    }

    sortAndFilterNotes() {
        this._model.sortAndFilter();
    }
}