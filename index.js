document.addEventListener("DOMContentLoaded", ()=> {

//general queries
let allProjectDiv = document.getElementById("all_project_div")
let allIdeasDiv = document.getElementById('all_ideas_for_project_div')

//query for form, for function submitProjectIdea
let formContainer = document.getElementById('form_container')
let projectIdeaForm = document.getElementById('create-project-idea-form')
let projectNameInput = document.querySelector("[name=project_title]")
let ideaTitle = document.querySelector("[name=idea_title]")
let ideaContent = document.querySelector("[name=idea_content]")
let ideaProtagonist = document.querySelector("[name=protagonist]")
let ideaAntagonist = document.querySelector("[name=antagonist]")
let ideaStart = document.getElementById('start')
let ideaEnd = document.getElementById('end')
let ideaAct = document.getElementById('act')
let ideaTurn = document.getElementById('turn')
projectIdeaForm.addEventListener("submit", submitProjectIdea)

function submitProjectIdea(event) {
  event.preventDefault()
  projectNameInput.value
  ideaTitle.value
  ideaContent.value
  ideaProtagonist.value
  ideaAntagonist.value
  ideaStart.value
  ideaEnd.value
  ideaAct.value
  ideaTurn.value

  //create POST fetch request to send the value of the form to the api
}

//query for nav bar, function to view all project titles
let navbar = document.getElementById('navbar_items')
navbar.addEventListener("click", viewAllProjects)
navbar.addEventListener("click", createProject)

function viewAllProjects(event) {
  if (event.target.className === "view_projects") {
    formContainer.innerHTML = "" //emptying the form div
    allProjectDiv.innerHTML = ""
    allIdeasDiv.innerHTML = ""
    //fetch to add project titles
    //create a ul
    //for each project title, create li with project title and an a tag
    //append ul to div
    let allProjectList = document.createElement("ul")
    allProjectList.className = "all_project_list"
    allProjectList.innerHTML = "<li><a class='project_title' href='#'>Twitter Sucks</a></li>" //add idea id
    allProjectDiv.append(allProjectList)

    allProjectDiv.addEventListener("click", allIdeasPage)
    //add event listener so that if a project title link is clicked, it goes to a page showing all ideas
    //for that project
  }
}

//function for when you click on a specific project title, you then go to a page with all the ideas for that project
function allIdeasPage(event) {
  if (event.target.className === "project_title") {
    console.log(event.target.innerText) // save name of project title
    allProjectDiv.innerHTML = ""
    //fetch to GET projects
    //find project that contains that title
    //iterate through each idea and append on page
    // console.log(allIdeasDiv)
    let saveDraggedStructure = document.createElement("button")
    saveDraggedStructure.innerText = "Save Current Version"
    let saveToTraditionalStructure = document.createElement("button")
    saveToTraditionalStructure.innerText = "Save To A Traditioal Structure"
    let createNewIdea = document.createElement("button")
    createNewIdea.innerText = "Create A New Idea"
    createNewIdea.className = "create_project"

    let ideaBox = document.createElement("div")
    ideaBox.className = "idea_box" //add border & background
    ideaBox.innerHTML = "<h3>This is a story of how Twitter Sucks</h3>" //inner HTML would be idea oneliner
    let ideaBox2 = document.createElement("div")
    ideaBox2.className = "idea_box" //add border & background
    ideaBox2.innerHTML = "<h3>And it goes likes this.....</h3>"
    allIdeasDiv.append(saveDraggedStructure, saveToTraditionalStructure, createNewIdea, ideaBox, ideaBox2)

    //add event listener to each ideabox so that it can fade out & we can see that idea's data points
    //add event listener to drag the idea boxes
    createNewIdea.addEventListener("click", createProject)
  }
}

navbar.addEventListener("click", createProject)

function createProject(event) {
  if (event.target.className === "create_project") {
    allProjectDiv.innerHTML = ""
    allIdeasDiv.innerHTML = ""
    formContainer.append(projectIdeaForm)
    //fetch to POST
  }
}




















}) //dom event listener
