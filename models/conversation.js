module.exports = {

	conversation: [],

	getConversation: function(){
		return this.conversation;
	},

	addMessage: function(user, message){
		this.conversation.push([user, message]);
	}
}