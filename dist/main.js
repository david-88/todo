(()=>{"use strict";const t=document.getElementById("tasks"),e=document.getElementById("task-add"),n=document.getElementById("task-input"),i=(document.getElementById("lists"),document.getElementById("list-add"),document.getElementById("list-input"),{htmlElement:t,addButton:e,inputField:n}),d=function(t){function e(t){const e=t.id,n=document.createElement("p"),i=document.createElement("button");i.innerHTML="del",i.dataset.itemid=e,i.classList.add("delete-task-button"),i.addEventListener("click",this.onClickDeleteItem),n.innerHTML=t.text,n.appendChild(i),n.classList.add("task"),this.htmlElement.appendChild(n)}return{initialize:function(){this.addButton.addEventListener("click",this.onClickAddItem)},setNewItemText:function(){this.newItemText=this.inputField.value},renderExistingItems:function(t){this.inputField.value="",this.htmlElement.innerHTML="",t.forEach(e,this)},onClickAddItem:null,onClickDeleteItem:null}}();var s;(function(t,e){function n(){t.setNewItemText(),e.addTask(t.newItemText),t.renderExistingItems(e.data)}function i(n){const i=n.target.dataset.itemid;e.deleteTask(i),t.renderExistingItems(e.data)}return{initialize:function(){t.onClickAddItem=n,t.onClickDeleteItem=i,t.initialize()}}})(Object.assign({},i,d),{data:s=[],addTask:function(t){const e={id:this.creationCounter,text:t};s.push(e),this.creationCounter++},deleteTask:function(t){t=parseInt(t);const e=s.findIndex((function(e){if(e.id===t)return!0}));s.splice(e,1)},creationCounter:0}).initialize()})();
//# sourceMappingURL=main.js.map