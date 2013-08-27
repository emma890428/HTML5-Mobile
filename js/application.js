var NotesApp = (function(){
	var App = {
		stores: {},
		views:{}
	}

	//Initialize localStorage Data Store
	App.stores.notes = new Store('note');

	//Note Model
	var Note = Backbone.Model.extend({
		//Use localStorage datastore
		localStorage: App.stores.notes,

		initialize: function(){
			if(!this.get('title')){
				this.set({title: "Note @ " + Date() })
			};

			if(!this.get('body')){
				this.set({body: "No Content"})
			};
		}
	})

	//Views
	var NewFormView = Backbone.View.extend({

		events: {
			"submit form": "createNote"
		},

		createNote: function(e){
			var attrs = this.getAttributes(),
				note = new Note();

			note.set(attrs);
			note.save();

			//Stop browser from actually submitting the form like normal
			e.preventDefault();
			//Stop jQuery Mobile from doing its form magic
			e.stopPropagation();

			//Close the dialog
			$('.ui-dialog').dialog('close');
			this.reset();
		},

		getAttributes: function () {
			return {
				title: this.$('form [name=title]').val(),
				body: this.$('form [name=body]').val()
			}
		},

		reset: function(){
			this.$('input, textarea').val('');
		}
	});

	window.Note = Note;

	$(document).ready(function(){
		App.views.new_form = new NewFormView({
			el: $('#new')
		});
	})
	

	return App;
})()