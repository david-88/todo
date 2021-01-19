(()=>{"use strict";class t{constructor(e){this.text=e,this.id=t.countInstances()}static countInstances(){return t.count=(t.count||0)+1,t.count}}class e extends t{constructor(t){super(t),this.taskList=[],this.active=!0}appendTask(t){this.taskList.push(t)}deleteTask(t){const e=this.taskList.findIndex((e=>e.id===t.id));this.taskList.splice(e,1)}getTask(t){const e=this.getIndexOfTask(t);return this.taskList[e]}getIndexOfTask(t){return t=parseInt(t),this.taskList.findIndex((function(e){if(e.id===t)return!0}))}update(t){this.text=t}}new class{constructor(t,e,n,s){this.Task=e,this.Context=n,this.contextList=new s(this.Context),this.todoDisplay=new t,this.init()}init(){const t=this;this.todoDisplay.onClickAddContext=this.onClickAddContext.bind(this),this.todoDisplay.onClickAddTask=this.onClickAddTask.bind(this),this.todoDisplay.onClickDeleteContext=this.onClickDeleteContext.bind(null,this),this.todoDisplay.onClickChangeContext=function(e){t.onClickChangeContext(e,this,t)},this.todoDisplay.onDclickEditContext=this.onDclickEditContext.bind(null,this),this.todoDisplay.onEnterSaveInput=this.onEnterSaveInput.bind(null,this),this.todoDisplay.onMsDwnCopyTask=function(e){t.onMsDwnCopyTask(e,this,t)},this.todoDisplay.onMsUpAnalyzePosition=function(e){t.onMsUpAnalyzePosition(e,this,t)},this.todoDisplay.initListeners(),this.loadStartPage()}onClickAddContext(){const t=this.todoDisplay.getContextInputValue();this.createNewContext(t)}onClickAddTask(){const t=this.todoDisplay.getTaskInputValue();this.createNewTask(t)}loadStartPage(){this.activeContext=this.contextList.getActiveContext();const t=this.contextList.getAllContexts();this.todoDisplay.renderAllContexts(t,this.activeContext)}createNewTask(t){const e=new this.Task(t);this.contextList.getActiveContext().appendTask(e),this.todoDisplay.appendNewTask(e)}createNewContext(t){const e=new this.Context(t);e.onClickChangeContext=this.onClickChangeContext,this.contextList.addNewContext(e),this.todoDisplay.appendNewContext(e)}onClickDeleteContext(t,e){const n=t.todoDisplay.getElementToDelete(e),s=t.todoDisplay.getItemId(n);t.contextList.deleteContext(s),t.todoDisplay.removeContext(n)}onClickChangeContext(t,e,n){const s=n.todoDisplay.getItemId(e),o=n.contextList.getContext(s);this.contextList.setActiveContext(o);const i=o.taskList;this.todoDisplay.renderTasks(i),this.todoDisplay.highlightActiveContext(e)}onDclickEditContext(t,e){t.todoDisplay.prepareContextEdit(e.target)}onEnterSaveInput(t,e){if("Enter"===e.key){const n=t.todoDisplay.getUserInput(e),s=t.todoDisplay.getContextElement(e),o=t.todoDisplay.getItemId(s),i=t.contextList.getIndexOfContext(o);t.contextList.list[i].update(n),t.todoDisplay.updateContextAfterEdit(s,n)}}onMsDwnCopyTask(t,e,n){n.todoDisplay.attachTaskToMouse(t,e)}onMsUpAnalyzePosition(t,e,n){if(e.classList.contains("context")){const s=n.contextList.getActiveContext(),o=n.todoDisplay.temporarySavedTaskElement,i=n.todoDisplay.getItemId(o),a=n.contextList.activeContext.getTask(i),d=n.todoDisplay.getItemId(e);n.contextList.getContext(d).appendTask(a),s.deleteTask(a),n.todoDisplay.removeTask(o),t.stopPropagation()}n.todoDisplay.undoTaskMoveActions()}removeTask(t){this.contextList.getActiveContext().deleteTask(t)}}(class{constructor(){this.bodyElement=document.querySelector("body"),this.contextContainer=document.getElementById("context-container"),this.contextInput=document.getElementById("context-input"),this.contextButton=document.getElementById("context-add"),this.taskContainer=document.getElementById("task-container"),this.taskList=document.getElementById("tasks"),this.taskInput=document.getElementById("task-input"),this.taskButton=document.getElementById("task-add"),this.activeContext=null,this.onClickAddContext=null,this.onClickDeleteContext=null,this.onClickChangeContext=null,this.onDclickEditContext=null,this.onEnterSaveInput=null,this.onClickAddTask=null,this.onMsDwnCopyTask=null,this.onMsUpAnalyzePosition=null}initListeners(){this.contextButton.addEventListener("click",this.onClickAddContext),this.taskButton.addEventListener("click",this.onClickAddTask)}renderAllContexts(t,e){t.forEach(this.appendNewContext.bind(this)),this.activeContext=document.querySelector(`[data-itemid="${e.id}"]`),this.highlightActiveContext(this.activeContext)}appendNewContext(t){const e=this.createDelBtn(),n=this.createInnerContent(t.text,e),s=this.createItemElement(t.id,n,"context");s.addEventListener("click",this.onClickChangeContext),this.contextContainer.appendChild(s)}renderTasks(t){this.taskList.innerHTML="",t.forEach(this.appendNewTask.bind(this))}appendNewTask(t){const e=this.createDelBtn(),n=this.createInnerContent(t.text,e),s=this.createItemElement(t.id,n,"task");s.classList.add("task"),s.addEventListener("mousedown",this.onMsDwnCopyTask),this.taskList.appendChild(s)}highlightActiveContext(t){this.activeContext.style.border="none",this.activeContext=t,t.style.border="1px solid black"}createItemElement(t,e,n){const s=document.createElement("p");return s.dataset.itemid=t,s.classList.add(n),s.addEventListener("dblclick",this.onDclickEditContext),s.appendChild(e),s}createDelBtn(){const t=document.createElement("button");return t.innerHTML="del",t.addEventListener("click",this.onClickDeleteContext),t}createInnerContent(t,e){const n=document.createElement("div"),s=document.createElement("span");return s.innerHTML=t,n.appendChild(s),n.appendChild(e),n}prepareContextEdit(t){const e=this.createInputBox(t);this.saveContextElements(t),this.createEditableElement(e)}createInputBox(t){const e=document.createElement("input"),n=t.firstChild.textContent;return e.type="text",e.placeholder=n,e.addEventListener("keyup",this.onEnterSaveInput),e}saveContextElements(t){this.contextElements=t.parentNode}createEditableElement(t){const e=this.contextElements.parentNode;e.firstChild.remove(),e.appendChild(t)}removeContext(t){t.remove()}updateContextAfterEdit(t,e){this.contextElements.firstChild.innerHTML=e,t.firstChild.remove(),t.appendChild(this.contextElements)}attachTaskToMouse(t,e){const n=this.createTaskCopy(e);this.bodyElement.addEventListener("mousemove",this.moveTaskWithMouse.bind(null,this,n)),this.bodyElement.addEventListener("mouseup",this.onMsUpAnalyzePosition);const s=document.querySelectorAll(".context"),o=this;s.forEach((function(t){t.addEventListener("mouseover",o.onMsOverHighlight),t.addEventListener("mouseout",o.onMsOutNormal),t.addEventListener("mouseup",o.onMsUpAnalyzePosition)}))}onMsOverHighlight(){this.style.backgroundColor="green"}onMsOutNormal(){this.style.backgroundColor="aqua"}createTaskCopy(t){this.temporarySavedTaskElement=t;const e=this.temporarySavedTaskElement.cloneNode(!0);return e.style.backgroundColor="red",e.id="task-copy",this.bodyElement.appendChild(e),e}moveTaskWithMouse(t,e,n){const s=n.x,o=n.y;e.style.position="absolute",e.style.top=o+"px",e.style.left=s+10+"px"}removeTaskCopy(){document.getElementById("task-copy").remove()}getElementToDelete(t){return t.target.parentNode.parentNode}removeTask(t){t.remove()}getItemId(t){return t.dataset.itemid}getContextInputValue(){return this.contextInput.value}getTaskInputValue(){return this.taskInput.value}getContextElement(t){return t.target.parentNode}getUserInput(t){return t.target.value}undoTaskMoveActions(){this.removeTaskCopy(),this.bodyElement.removeEventListener("mouseup",this.onMsUpAnalyzePosition);const t=document.querySelectorAll(".context"),e=this;t.forEach((function(t){t.removeEventListener("mouseover",e.onMsOverHighlight),t.removeEventListener("mouseout",e.onMsOutNormal),t.removeEventListener("mouseup",e.onMsUpAnalyzePosition),t.style.backgroundColor="aqua"}))}},class extends t{constructor(t){super(t),this.favorite=!1}},e,class{constructor(t){this.Context=t,this.list=[],this.init()}init(){const t=new e("inbox");this.addNewContext(t),this.setActiveContext(t)}addNewContext(t){this.list.push(t)}deleteContext(t){const e=this.getIndexOfContext(t);this.list.splice(e,1)}getContext(t){const e=this.getIndexOfContext(t);return this.list[e]}getIndexOfContext(t){return t=parseInt(t),this.list.findIndex((function(e){if(e.id===t)return!0}))}setActiveContext(t){this.activeContext=t}getActiveContext(){return this.activeContext}getAllContexts(){return this.list}})})();
//# sourceMappingURL=main.js.map