;(() => {
  'use strict'
  class t {
    constructor(e) {
      ;(this.text = e), (this.id = t.countInstances())
    }
    static countInstances() {
      return (t.count = (t.count || 0) + 1), t.count
    }
  }
  class e extends t {
    constructor(t) {
      super(t), (this.taskList = []), (this.active = !0)
    }
    appendTask(t) {
      this.taskList.push(t)
    }
    deleteTask(t) {
      console.log(this.taskList)
      const e = this.getIndexOfTask(t)
      this.taskList.splice(e, 1), console.log(this.taskList)
    }
    getTask(t) {
      const e = this.getIndexOfTask(t)
      return this.taskList[e]
    }
    getIndexOfTask(t) {
      return (
        (t = parseInt(t)),
        this.taskList.findIndex(function (e) {
          return e.id === t
        })
      )
    }
    update(t) {
      this.text = t
    }
  }
  new (class {
    constructor(t, e, s, n) {
      ;(this.Task = e),
        (this.Context = s),
        (this.contextList = new n(this.Context)),
        (this.todoDisplay = new t()),
        this.init()
    }
    init() {
      this.setDefaultTasks()
      const t = this
      ;(this.todoDisplay.onClickAddContext = this.onClickAddContext.bind(this)),
        (this.todoDisplay.onClickAddTask = this.onClickAddTask.bind(this)),
        (this.todoDisplay.onClickDeleteItem = this.onClickDeleteItem.bind(
          null,
          this
        )),
        (this.todoDisplay.onClickChangeContext = function () {
          t.onClickChangeContext(this, t)
        }),
        (this.todoDisplay.onDclickEditItem = function () {
          t.onDclickEditItem(this, t)
        }),
        (this.todoDisplay.onEnterSaveInput = this.saveInput.bind(null, this)),
        (this.todoDisplay.onMsDwnCopyTask = function () {
          t.onMsDwnCopyTask(this, t)
        }),
        (this.todoDisplay.onMsUpAnalyzePosition = function (e) {
          t.onMsUpAnalyzePosition(e, this, t)
        }),
        (this.todoDisplay.onClickOutsideSave = this.saveInput.bind(null, this)),
        this.todoDisplay.initListeners(),
        this.loadStartPage()
    }
    setDefaultTasks() {
      ;(this.activeContext = this.contextList.getActiveContext()),
        this.createNewTask('Double click me to edit my name'),
        this.createNewTask('Create a new list'),
        this.createNewTask('Click and hold me to move me to the new list')
    }
    loadStartPage() {
      const t = this.contextList.getAllContexts(),
        e = this.activeContext.taskList
      this.todoDisplay.renderTasks(e),
        this.todoDisplay.renderAllContexts(t, this.activeContext),
        this.todoDisplay.setContextHeading(this.activeContext.text)
    }
    onClickAddContext() {
      const t = this.todoDisplay.getContextInputValue() || 'Give me a name'
      this.createNewContext(t), this.todoDisplay.resetContextInput()
    }
    onClickAddTask() {
      const t = this.todoDisplay.getTaskInputValue() || 'Give me a name'
      this.createNewTask(t), this.todoDisplay.resetTaskInput()
    }
    createNewTask(t) {
      const e = new this.Task(t)
      this.contextList.getActiveContext().appendTask(e),
        this.todoDisplay.appendNewTask(e)
    }
    createNewContext(t) {
      const e = new this.Context(t)
      ;(e.onClickChangeContext = this.onClickChangeContext),
        this.contextList.addNewContext(e),
        this.todoDisplay.appendNewContext(e)
    }
    onClickDeleteItem(t, e) {
      const s = t.todoDisplay.getElementToDelete(e),
        n = t.todoDisplay.getItemId(s),
        i = t.todoDisplay.getClassName(s)
      i.contains('context')
        ? (t.contextList.deleteContext(n), t.todoDisplay.removeTasks())
        : i.contains('task') && t.contextList.activeContext.deleteTask(n),
        t.todoDisplay.removeElement(s),
        e.stopPropagation()
    }
    onClickChangeContext(t, e) {
      const s = e.todoDisplay.getItemId(t),
        n = e.contextList.getContext(s)
      this.contextList.setActiveContext(n)
      const i = n.taskList
      this.todoDisplay.renderTasks(i),
        this.todoDisplay.highlightActiveContext(t),
        this.todoDisplay.setContextHeading(n.text)
    }
    onDclickEditItem(t, e) {
      e.todoDisplay.prepareItemEdit(t)
    }
    saveInput(t, e) {
      if ('Enter' === e.key || 'click' === e.type) {
        const e = t.todoDisplay.getEditInput(),
          s = t.todoDisplay.getEditItem(),
          n = t.todoDisplay.getItemId(s),
          i = t.todoDisplay.getClassName(s)
        if (i.contains('context')) {
          const s = t.contextList.getIndexOfContext(n)
          t.contextList.list[s].update(e)
        } else if (i.contains('task')) {
          const s = t.contextList.activeContext.getIndexOfTask(n)
          t.contextList.activeContext.taskList[s].text = e
        }
        t.todoDisplay.updateDomAfterEdit(s, e)
      }
    }
    onMsDwnCopyTask(t, e) {
      e.todoDisplay.attachTaskToMouse(t)
    }
    onMsUpAnalyzePosition(t, e, s) {
      if (e.classList.contains('context')) {
        const n = s.contextList.getActiveContext(),
          i = s.todoDisplay.temporarySavedTaskElement,
          o = s.todoDisplay.getItemId(i),
          a = s.contextList.activeContext.getTask(o),
          l = s.todoDisplay.getItemId(e)
        s.contextList.getContext(l).appendTask(a),
          n.deleteTask(a),
          s.todoDisplay.removeElement(i),
          t.stopPropagation()
      }
      s.todoDisplay.undoTaskMoveActions()
    }
    removeTask(t) {
      this.contextList.getActiveContext().deleteTask(t)
    }
  })(
    class {
      constructor() {
        ;(this.bodyElement = document.querySelector('body')),
          (this.contextContainer = document.getElementById(
            'context-container'
          )),
          (this.contextInput = document.getElementById('context-input')),
          (this.contextButton = document.getElementById('context-add-button')),
          (this.taskContainer = document.getElementById('task-container')),
          (this.taskList = document.getElementById('tasks')),
          (this.taskInput = document.getElementById('task-input')),
          (this.taskButton = document.getElementById('task-add-button')),
          (this.taskHeading = document.getElementById(
            'heading-task-container'
          )),
          (this.activeContext = null),
          (this.onClickAddContext = null),
          (this.onClickDeleteItem = null),
          (this.onClickChangeContext = null),
          (this.onDclickEditContext = null),
          (this.onEnterSaveInput = null),
          (this.onClickOutsideSave = null),
          (this.onClickAddTask = null),
          (this.onMsDwnCopyTask = null),
          (this.onMsUpAnalyzePosition = null)
      }
      initListeners() {
        this.contextButton.addEventListener('click', this.onClickAddContext),
          this.taskButton.addEventListener('click', this.onClickAddTask)
      }
      renderAllContexts(t, e) {
        t.forEach(this.appendNewContext.bind(this)),
          (this.activeContext = document.querySelector(
            `[data-itemid="${e.id}"]`
          )),
          this.highlightActiveContext(this.activeContext)
      }
      appendNewContext(t) {
        const e = this.createDelBtn(),
          s = this.createInnerContent(t.text, e),
          n = this.createItemElement(t.id, s, 'context')
        n.addEventListener('click', this.onClickChangeContext),
          this.contextContainer.appendChild(n)
      }
      highlightActiveContext(t) {
        ;(this.activeContext.style.border = 'none'),
          (this.activeContext = t),
          (t.style.border = '1px solid black')
      }
      renderTasks(t) {
        ;(this.taskList.innerHTML = ''),
          t.forEach(this.appendNewTask.bind(this))
      }
      appendNewTask(t) {
        const e = this.createDelBtn(),
          s = this.createInnerContent(t.text, e),
          n = this.createItemElement(t.id, s, 'task')
        n.classList.add('task'),
          n.addEventListener('mousedown', this.onMsDwnCopyTask),
          this.taskList.appendChild(n)
      }
      createItemElement(t, e, s) {
        const n = document.createElement('p')
        return (
          (n.dataset.itemid = t),
          n.classList.add(s),
          n.addEventListener('dblclick', this.onDclickEditItem),
          n.appendChild(e),
          n
        )
      }
      createDelBtn() {
        const t = document.createElement('i')
        return (
          t.classList.add('fa'),
          t.classList.add('fa-trash-o'),
          t.addEventListener('click', this.onClickDeleteItem),
          t
        )
      }
      createInnerContent(t, e) {
        const s = document.createElement('div'),
          n = document.createElement('span')
        return (n.innerHTML = t), s.appendChild(n), s.appendChild(e), s
      }
      prepareItemEdit(t) {
        this.saveItemElements(t)
        const e = this.defineMaxLength(),
          s = this.createInputBox(t, e)
        this.createEditableElement(s),
          this.bodyElement.addEventListener('click', this.onClickOutsideSave),
          s.addEventListener('click', (t) => t.stopPropagation()),
          this.addContextListeners()
      }
      saveItemElements(t) {
        this.itemElements = t.firstChild
      }
      defineMaxLength() {
        const t = this.itemElements.parentNode.className
        return 'task' === t ? 25 : 'context' === t ? 8 : void 0
      }
      createInputBox(t, e) {
        const s = document.createElement('input'),
          n = t.firstChild.textContent
        return (
          (s.type = 'text'),
          (s.id = 'edit-item-field'),
          (s.maxLength = e),
          (s.value = n),
          s.addEventListener('keyup', this.onEnterSaveInput),
          s
        )
      }
      createEditableElement(t) {
        const e = this.itemElements.parentNode
        ;(e.id = 'edit-item'),
          e.firstChild.remove(),
          e.appendChild(t),
          t.focus()
      }
      updateDomAfterEdit(t, e) {
        ;(this.itemElements.firstChild.innerHTML = e),
          t.firstChild.remove(),
          t.appendChild(this.itemElements),
          t.removeAttribute('id'),
          this.bodyElement.removeEventListener(
            'click',
            this.onClickOutsideSave
          ),
          this.addContextListeners()
      }
      attachTaskToMouse(t) {
        const e = this.createTaskCopy(t)
        this.bodyElement.addEventListener(
          'mousemove',
          this.moveTaskWithMouse.bind(null, this, e)
        ),
          this.bodyElement.addEventListener(
            'mouseup',
            this.onMsUpAnalyzePosition
          )
        const s = document.querySelectorAll('.context'),
          n = this
        s.forEach(function (t) {
          t.addEventListener('mouseover', n.onMsOverHighlight),
            t.addEventListener('mouseout', n.onMsOutNormal),
            t.addEventListener('mouseup', n.onMsUpAnalyzePosition)
        }),
          this.changeUserSelect('none')
      }
      onMsOverHighlight() {
        this.style.opacity = '0.7'
      }
      onMsOutNormal() {
        this.style.opacity = '1'
      }
      createTaskCopy(t) {
        this.temporarySavedTaskElement = t
        const e = this.temporarySavedTaskElement.cloneNode(!0)
        return (
          (e.id = 'task-copy'),
          (e.style.width = '25vw'),
          (e.style.display = 'none'),
          this.bodyElement.appendChild(e),
          e
        )
      }
      moveTaskWithMouse(t, e, s) {
        const n = s.x,
          i = s.y
        ;(e.style.position = 'absolute'),
          (e.style.top = i + 'px'),
          (e.style.left = n + 10 + 'px'),
          (e.style.display = 'block')
      }
      removeTaskCopy() {
        document.getElementById('task-copy').remove()
      }
      undoTaskMoveActions() {
        this.removeTaskCopy(),
          this.bodyElement.removeEventListener(
            'mouseup',
            this.onMsUpAnalyzePosition
          )
        const t = document.querySelectorAll('.context'),
          e = this
        t.forEach(function (t) {
          t.removeEventListener('mouseover', e.onMsOverHighlight),
            t.removeEventListener('mouseout', e.onMsOutNormal),
            t.removeEventListener('mouseup', e.onMsUpAnalyzePosition),
            (t.style.opacity = '1')
        }),
          this.changeUserSelect('auto')
      }
      setContextHeading(t) {
        this.taskHeading.innerText = t
      }
      changeUserSelect(t) {
        document.querySelectorAll('*').forEach((e) => {
          e.style.userSelect = t
        })
      }
      getItemId(t) {
        return t.dataset.itemid
      }
      getEditItem() {
        return document.getElementById('edit-item')
      }
      getContextInputValue() {
        return this.contextInput.value
      }
      resetContextInput() {
        this.contextInput.value = ''
      }
      removeElement(t) {
        t.remove()
      }
      removeTasks() {
        console.log('in here'), (this.taskList.innerHTML = '')
      }
      getElementToDelete(t) {
        return t.target.parentNode.parentNode
      }
      getTaskInputValue() {
        return this.taskInput.value
      }
      resetTaskInput() {
        this.taskInput.value = ''
      }
      getEditInput() {
        return document.getElementById('edit-item-field').value
      }
      getClassName(t) {
        return t.classList
      }
      removeContextListeners() {
        document.querySelectorAll('.context').forEach((t) => {
          t.removeEventListener('click', this.onClickChangeContext)
        })
      }
      addContextListeners() {
        document.querySelectorAll('.context').forEach((t) => {
          t.addEventListener('click', this.onClickChangeContext)
        })
      }
    },
    class extends t {
      constructor(t) {
        super(t), (this.favorite = !1)
      }
    },
    e,
    class {
      constructor(t) {
        ;(this.Context = t), (this.list = []), this.init()
      }
      init() {
        const t = new e('inbox')
        this.addNewContext(t), this.setActiveContext(t)
      }
      addNewContext(t) {
        this.list.push(t)
      }
      deleteContext(t) {
        const e = this.getIndexOfContext(t)
        this.list.splice(e, 1)
      }
      getContext(t) {
        const e = this.getIndexOfContext(t)
        return this.list[e]
      }
      getIndexOfContext(t) {
        return (
          (t = parseInt(t)),
          this.list.findIndex(function (e) {
            return e.id === t
          })
        )
      }
      setActiveContext(t) {
        this.activeContext = t
      }
      getActiveContext() {
        return this.activeContext
      }
      getAllContexts() {
        return this.list
      }
    }
  )
})()
//# sourceMappingURL=main.js.map
