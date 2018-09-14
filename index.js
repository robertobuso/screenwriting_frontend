document.addEventListener("DOMContentLoaded", ()=> {

//general queries (main document containers)
let singleIdeaView = document.getElementById('single_idea_view')
let formContainer = document.getElementById('form_container')
let newProjectContainer = document.getElementById("append_all_project_div")
let allProjectDiv = document.createElement("div")
allProjectDiv.className = "all_project_div"
let projectList = document.createElement("ul")
projectList.className = "project_list"
allProjectDiv.append(projectList)
allProjectDiv.addEventListener("click", allIdeasPage)
let allIdeasDiv = document.getElementById('all_ideas_for_project_div')


//query for form to submit new project
let newProjectForm = document.createElement("form")
newProjectForm.className = 'create_new_project'

newProjectForm.innerHTML = `
<h3>Create A New Project</h3>
<label>Project Title</label>
<input type="text" name="new_project_title" value="" placeholder="Enter a project title" class="input-text">
<br>
<label>Project Protagonist</label>
<input type="text" name="project_protagonist" value="" placeholder="Enter the protagonist" class="input-text">
<br>
<br>
<input type="submit" name="submit" value="Submit" class="submit">`

// formContainer.append(newProjectForm)

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
navbar.addEventListener("click", createProject)


//GET dropdown for exisiting project titles
fetch("http://localhost:3000/api/v1/projects")
  .then(rep => rep.json())
  .then(function (projects) {
    projects.forEach(function (project) {
      let option = document.createElement("option")
      option.innerText = project.title
      option.value = project.id
      exisitingProjectTitleDropdown.append(option)
    })
  })


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
  .then(res => res.json())
  .then(function (project) {
    let option = document.createElement("option")
    option.innerText = project.title
    option.value = project.id
    exisitingProjectTitleDropdown.append(option)
  })
  newProjectTitle.value=""
  newProjectProtagonist.value=""
}

function submitProjectIdea(event) {
  event.preventDefault()
  console.log(ideaAct.value)
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
  formContainer.hidden = true
  projectIdeaForm.hidden = true
  allIdeasDiv.hidden = true
  if (event.target.className === "view_projects") {
    fetch("http://localhost:3000/api/v1/projects")
      .then(rep => rep.json())
      .then(function (projects) {
        projects.forEach(function (project) {
          let bulletPoint = document.createElement("li")
          bulletPoint.innerText = project.title
          bulletPoint.innerHTML = `<a data-id='${project.id}' class='project_title' href='#'>${project.title}</a>`
          projectList.append(bulletPoint)
          allProjectDiv.append(projectList)
          newProjectContainer.hidden = false
          newProjectContainer.append(allProjectDiv)
        })
      })
  }
}

//GET user clicks on a project title & goes to the idea page for that project
function allIdeasPage(event) {
  if (event.target.className === "project_title") {
    newProjectContainer.hidden = true
    let projectID = event.target.dataset.id
    fetch("http://localhost:3000/api/v1/ideas")
      .then(rep => rep.json())
      .then(function (ideas) {
        let project_ideas = ideas.filter(idea => idea.project_id === parseInt(projectID))

        project_ideas.forEach(function (idea) {
          let ideaContainer = document.createElement("div")
          ideaContainer.className= "idea_container"
          ideaContainer.dataset.id = idea.id
          let ideaCard = document.createElement("div")
          ideaCard.className = "idea_card"
          ideaCard.dataset.id = idea.id
          let ideaFront = document.createElement("div")
          ideaFront.dataset.id = idea.id
          ideaFront.className = "idea_front"
          let ideaBack = document.createElement("div")
          ideaBack.dataset.id = idea.id
          ideaBack.className = "idea_back"

          let ideaBoxFront = document.createElement("div")
          ideaBoxFront.className = "idea_box_front"
          ideaBoxFront.dataset.id = idea.id
          ideaBoxFront.innerHTML = `
          <p>${idea.title}</p>
          <p>${idea.content}</p>
          `
          ideaCard.append(ideaBoxFront)

          let ideaBoxBack = document.createElement("div")
          ideaBoxBack.className = "idea_box_back"
          ideaBoxBack.dataset.id = idea.id
          ideaBoxBack.innerHTML = `
          ${idea.protagonist ? `<p>Protagonist: ${idea.protagonist}</p>` : ""}
          ${idea.antagonist ? `<p>Antagonist: ${idea.antagonist}</p>` : ""}
          ${idea.begins ? `<p>Begins: ${idea.begins}</p>` : ""}
          ${idea.ends ? `<p>Ends: ${idea.ends}</p>` : ""}
          ${idea.act ? `<p>Act: ${idea.act}</p>` : ""}
          ${idea.turn ? `<p>Turn: ${idea.turn}</p>` : ""}
          ${idea.description ? `<p>Description: ${idea.description}</p>` : ""}
          ${idea.conflict ? `<p>Conflict: ${idea.conflict}</p>` : ""}
          ${idea.research ? `<p>Research: ${idea.research}</p>` : ""}
          ${idea.inspiration ? `<p>Inspiration: ${idea.inspiration}</p>` : ""}
          ${idea.miscellaneous ? `<p>Miscellaneous: ${idea.miscellaneous}</p>` : ""}
          `
          ideaCard.append(ideaBoxBack)
          ideaBoxBack.addEventListener("click", showASingleIdea)
          ideaContainer.append(ideaCard)
          // allIdeasDiv.hidden = false
          return allIdeasDiv.append(ideaContainer)
        })
      })
  }
}

//POST when user clickes on "Create A Project" on the navbar
function createProject(event) {
  event.preventDefault()
  if (event.target.className === "create_project") {
    newProjectContainer.hidden = true
    allIdeasDiv.hidden = true
    formContainer.append(newProjectForm)
    projectIdeaForm.hidden = true

    fetch("http://localhost:3000/api/v1/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title: newProjectTitle.value , protagonist: newProjectProtagonist.value})
    })
    .then(res => res.json())
    .then(function (project) {
      let option = document.createElement("option")
      option.innerText = project.title
      option.value = project.id
      exisitingProjectTitleDropdown.append(option)
    })
    newProjectTitle.value=""
    newProjectProtagonist.value=""
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
  let projectTitle = document.getElementById('idea_project_title')
  let projectProtagonist = document.getElementById('idea_project_protagonist')
  projectTitle.innerText = `Project Title: ${idea.project.title}`
  projectProtagonist.innerText = `Project Protagonist: ${idea.project.protagonist}`
  let viewAllBtn = document.getElementById('view-all-ideas-this-project-btn')
  viewAllBtn.hidden = false
  viewAllBtn.dataset.id = idea.project.id
  viewAllBtn.addEventListener("click", fromSingleToAll)

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

function fromSingleToAll(event) {
  if (event.target.id === "view-all-ideas-this-project-btn") {
    singleIdeaView.hidden = true
    let projectID = event.target.dataset.id
    fetch("http://localhost:3000/api/v1/ideas")
      .then(rep => rep.json())
      .then(function (ideas) {
        let project_ideas = ideas.filter(idea => idea.project_id === parseInt(projectID))

        project_ideas.forEach(function (idea) {
          let ideaContainer = document.createElement("div")
          ideaContainer.className= "idea_container"
          ideaContainer.dataset.id = idea.id
          let ideaCard = document.createElement("div")
          ideaCard.className = "idea_card"
          ideaCard.dataset.id = idea.id
          let ideaFront = document.createElement("div")
          ideaFront.dataset.id = idea.id
          ideaFront.className = "idea_front"
          let ideaBack = document.createElement("div")
          ideaBack.dataset.id = idea.id
          ideaBack.className = "idea_back"

          let ideaBoxFront = document.createElement("div")
          ideaBoxFront.className = "idea_box_front"
          ideaBoxFront.dataset.id = idea.id
          ideaBoxFront.innerHTML = `
          <p>${idea.title}</p>
          <p>${idea.content}</p>
          `
          ideaCard.append(ideaBoxFront)

          let ideaBoxBack = document.createElement("div")
          ideaBoxBack.className = "idea_box_back"
          ideaBoxBack.dataset.id = idea.id
          ideaBoxBack.innerHTML = `
          ${idea.protagonist ? `<p>Protagonist: ${idea.protagonist}</p>` : ""}
          ${idea.antagonist ? `<p>Antagonist: ${idea.antagonist}</p>` : ""}
          ${idea.begins ? `<p>Begins: ${idea.begins}</p>` : ""}
          ${idea.ends ? `<p>Ends: ${idea.ends}</p>` : ""}
          ${idea.act ? `<p>Act: ${idea.act}</p>` : ""}
          ${idea.turn ? `<p>Turn: ${idea.turn}</p>` : ""}
          ${idea.description ? `<p>Description: ${idea.description}</p>` : ""}
          ${idea.conflict ? `<p>Conflict: ${idea.conflict}</p>` : ""}
          ${idea.research ? `<p>Research: ${idea.research}</p>` : ""}
          ${idea.inspiration ? `<p>Inspiration: ${idea.inspiration}</p>` : ""}
          ${idea.miscellaneous ? `<p>Miscellaneous: ${idea.miscellaneous}</p>` : ""}
          `
          ideaCard.append(ideaBoxBack)
          ideaBoxBack.addEventListener("click", showASingleIdea)
          ideaContainer.append(ideaCard)
          // allIdeasDiv.hidden = false
          return allIdeasDiv.append(ideaContainer)
        })
      })
  }
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

function showASingleIdea(event) {
  if (event.target.className === "idea_box_back") {
    projectIdeaForm.hidden = false
    singleIdeaView.append(projectIdeaForm)
    newProjectContainer.hidden = true
    allIdeasDiv.innerHTML = ""

    let ideaId = event.target.dataset.id
    console.log(ideaId)
    fetch(`http://localhost:3000/api/v1/ideas/${ideaId}`)
      .then(res => res.json())
      .then(idea => showSingleIdea(idea))
  }
}

}) //dom event listener
