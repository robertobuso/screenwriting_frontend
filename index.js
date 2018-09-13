document.addEventListener("DOMContentLoaded", ()=> {

//general queries (main document containers)
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
navbar.addEventListener("click", createProject)
navbar.addEventListener("click", createNewIdea) //haven't implemented

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

//POST submit a new idea to an exisiting project on our "homepage"
//Roberto's works BUT added coded fix for acts
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
      project_id: exisitingProjectTitleDropdown.value
    })
  })
    ideaTitle.value=""
    ideaContent.value=""
    ideaProtagonist.value=""
    ideaAntagonist.value=""
    ideaStart.value=""
    ideaEnd.value=""
    ideaAct.value=""
    ideaTurn.value=""
    ideaDescription.value=""
    ideaConflict.value=""
    ideaResearch.value=""
    ideaInspo.value=""
    ideaMisc.value=""
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
          allProjectDiv.append(projectList)
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
          let ideaContainer = document.createElement("div")
          ideaContainer.className= "idea_container"
          let ideaCard = document.createElement("div")
          ideaCard.className = "idea_card"
          let ideaFront = document.createElement("div")
          ideaFront.className = "idea_front"
          let ideaBack = document.createElement("div")
          ideaBack.className = "idea_back"

          let editIdeaButton = document.createElement("button")
          editIdeaButton.dataset.id = idea.id
          editIdeaButton.innerText = "Edit"

          let ideaBoxFront = document.createElement("div")
          ideaBoxFront.className = "idea_box_front"
          ideaBoxFront.dataset.id = idea.id
          ideaBoxFront.innerHTML = `
          <p>Title: ${idea.title}</p>
          <p>Content: ${idea.content}</p>
          `
          ideaBoxFront.append(editIdeaButton)
          ideaCard.append(ideaBoxFront)

          let ideaBoxBack = document.createElement("div")
          ideaBoxBack.className = "idea_box_back"
          ideaBoxBack.innerHTML = `
          <p>Protagonist: ${idea.protagonist}</p>
          <p>Antagonist: ${idea.antagonist}</p>
          <p>Begins: ${idea.begins}</p>
          <p>Ends: ${idea.ends}</p>
          <p>Act: ${idea.act}</p>
          <p>Turn: ${idea.turn}</p>
          `
          ideaCard.append(ideaBoxBack)
          ideaContainer.append(ideaCard)
          return allIdeasDiv.append(ideaContainer)

          // return allIdeasDiv.append(ideaBox)
        })
      })
  }
}



//POST when user clickes on "Create A Project" on the navbar
function createProject(event) {
  event.preventDefault()
  if (event.target.className === "create_project") {
    allProjectDiv.innerHTML = ""
    allIdeasDiv.innerHTML = ""
    formContainer.append(newProjectForm)
    projectIdeaForm.innerHTML = ""

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

//when user clicks on Create Idea on the nabvar -- use Roberto's code & my html for Acts
function createNewIdea(event) {
  event.preventDefault()
  if (event.target.className === "create_idea") {
    allProjectDiv.innerHTML = ""
    allIdeasDiv.innerHTML = ""
    formContainer.append(newProjectForm, projectIdeaForm)

    //fetch to POST
  }
}




















}) //dom event listener
