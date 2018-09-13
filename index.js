document.addEventListener("DOMContentLoaded", ()=> {

//general queries
let formContainer = document.getElementById('form_container')
let allProjectDiv = document.getElementById("all_project_div")
let projectList = document.getElementById('project_list')
allProjectDiv.addEventListener("click", allIdeasPage)
let allIdeasDiv = document.getElementById('all_ideas_for_project_div')

//query for form to submit new project
let newProjectForm = document.getElementById('create_new_project')
let newProjectTitle = document.querySelector("[name=new_project_title]")
let newProjectProtagonist = document.querySelector("[name=project_protagonist]")
newProjectForm.addEventListener("submit", submitNewProject)

//query for form to submit idea
let projectIdeaForm = document.getElementById('create-project-idea-form')
let exisitingProjectTitleDropdown = document.querySelector('.exisiting_project')
let ideaTitle = document.querySelector("[name=idea_title]")
let ideaContent = document.querySelector("[name=idea_content]")
let ideaProtagonist = document.querySelector("[name=protagonist]")
let ideaAntagonist = document.querySelector("[name=antagonist]")
let ideaStart = document.getElementById('start')
let ideaEnd = document.getElementById('end')
let ideaAct = document.getElementById('act')
let ideaTurn = document.getElementById('turn')
let ideaDescription = document.getElementById('description')
let ideaConflict = document.getElementById('conflict')
let ideaMisc = document.getElementById('miscellaneous')
let ideaResearch = document.getElementById('research')
let ideaInspo = document.getElementById('inspiration')
projectIdeaForm.addEventListener("submit", submitProjectIdea)

//query for navbar
let navbar = document.getElementById('navbar_items')
navbar.addEventListener("click", viewAllProjects)
navbar.addEventListener("click", createProject) //haven't implemented

// GET dropdown for exisiting project titles
// fetch("http://localhost:3000/api/v1/projects")
//   .then(rep => rep.json())
//   .then(function (projects) {
//     projects.forEach(function (project) {
//       let option = document.createElement("option")
//       option.innerText = project.title
//       option.value = project.id
//       exisitingProjectTitleDropdown.append(option)
//     })
//   })

//POST submit a new project on our "homepage"
function submitNewProject(event) {
  event.preventDefault()
  fetch("http://localhost:3000/api/v1/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({title: newProjectTitle.value , protagonist: newProjectProtagonist.value})
  })
  newProjectTitle.value=""
  newProjectProtagonist.value=""
}

// POST submit a new idea to an exisiting project on our "homepage"
function submitProjectIdea(event) {
  event.preventDefault()
  fetch("http://localhost:3000/api/v1/ideas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: ideaTitle.value,
      content: ideaContent.value ,
      protagonist: ideaProtagonist.value,
      antagonist: ideaAntagonist.value,
      begins: ideaStart.value,
      ends: ideaEnd.value,
      act: ideaAct.value,
      turn: ideaTurn.value,
      description: ideaDescription.value,
      conflict: ideaConflict.value,
      research: ideaResearch.value,
      inspiration: ideaInspo.value,
      miscellaneous: ideaMisc.value,
      project_id: 1
    })
  })
  .then(r => r.json())
  .then(newIdea => showSingleIdea(newIdea))
  projectIdeaForm.reset()
  //WE NEED TO SAVE/POST NEW STRUCTURE HERE
}

//GET user goes to navbar & clicks "view all projects"
function viewAllProjects(event) {
  if (event.target.className === "view_projects") {
    formContainer.innerHTML = ""
    allProjectDiv.innerHTML = ""
    allIdeasDiv.innerHTML = ""
    fetch("http://localhost:3000/api/v1/projects")
      .then(rep => rep.json())
      .then(function (projects) {
        projects.forEach(function (project) {
          let bulletPoint = document.createElement("li")
          bulletPoint.innerText = project.title
          bulletPoint.innerHTML = `<a data-id='${project.id}' class='project_title' href='#'>${project.title}</a>`
          projectList.append(bulletPoint)
          return allProjectDiv.append(projectList)
        })
      })
  }
}

//GET user clicks on a project title & goes to the idea page for that project
function allIdeasPage(event) {
  if (event.target.className === "project_title") {
    allProjectDiv.innerHTML = ""
    let projectID = event.target.dataset.id
    fetch("http://localhost:3000/api/v1/ideas")
      .then(rep => rep.json())
      .then(function (ideas) {
        let project_ideas = ideas.filter(idea => idea.project_id === parseInt(projectID))
        project_ideas.forEach(function (idea) {

          let editIdeaButton = document.createElement("button")
          editIdeaButton.dataset.id = idea.id
          editIdeaButton.innerText = "Edit"

          let ideaBox = document.createElement("div")
          ideaBox.className = "idea_box"
          ideaBox.dataset.id = idea.id
          ideaBox.innerHTML = `
          <p>Title: ${idea.title}</p>
          <p>Content: ${idea.content}</p>
          <p>Protagonist: ${idea.protagonist}</p>
          <p>Antagonist: ${idea.antagonist}</p>
          <p>Begins: ${idea.begins}</p>
          <p>Ends: ${idea.ends}</p>
          <p>Act: ${idea.act}</p>
          <p>Turn: ${idea.turn}</p>
          `
          ideaBox.append(editIdeaButton)
          return allIdeasDiv.append(ideaBox)
        })
      })
  }
}


//this doesnt have function yet
function createProject(event) {
  event.preventDefault()
  if (event.target.className === "create_project") {
    allProjectDiv.innerHTML = ""
    allIdeasDiv.innerHTML = ""
    formContainer.append(newProjectForm, projectIdeaForm)
    // allIdeasDiv.innerHTML = ""

    //fetch to POST
  }
}

//Declare Variables for CurrentIdea and CurrentStructure
let currentIdea
let currentStructure

//Activate Edit button
let editButton = document.getElementById('edit-btn')

editButton.addEventListener('click', event => editSingleIdea(event))

//Populate Single View Card with Content and Values
function showSingleIdea(idea){
  editButton.dataset.editId = idea.id

  ideaTitle.value = idea.title
  ideaContent.value = idea.content
  ideaProtagonist.value = idea.protagonist
  ideaAntagonist.value = idea.antagonist
  ideaStart.value = idea.begins
  ideaEnd.value = idea.ends
  ideaAct.value = idea.act
  ideaTurn.value = idea.turn
  ideaDescription.value = idea.description
  ideaConflict.value = idea.conflict
  ideaResearch.value = idea.research
  ideaInspo.value = idea.inspiration
  ideaMisc.value = idea.miscellaneous
}

//Update Single View Card with new Content and Values
function editSingleIdea(event){
  fetch("http://localhost:3000/api/v1/ideas/" + event.target.dataset.editId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: ideaTitle.value,
      content: ideaContent.value ,
      protagonist: ideaProtagonist.value,
      antagonist: ideaAntagonist.value,
      begins: ideaStart.value,
      ends: ideaEnd.value,
      act: ideaAct.value,
      turn: ideaTurn.value,
      description: ideaDescription.value,
      conflict: ideaConflict.value,
      research: ideaResearch.value,
      inspiration: ideaInspo.value,
      miscellaneous: ideaMisc.value,
      project_id: 1
    })
  })
  .then(r => r.json())
  .then(newIdea => showSingleIdea(newIdea))
}




}) //dom event listener
