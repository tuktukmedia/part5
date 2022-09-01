describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'Nigel Mansel',
      username: 'mansel',
      password: 'pass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })
  it('front page can be opened', function () {
    cy.contains('password')
    cy.contains('username')
  })

  describe('Login', function () {
    it('fails with wrong credentials', function () {
      cy.get('#username').type('seppo')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Wrong')
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mansel')
      cy.get('#password').type('pass')
      cy.get('#login-button').click()
      cy.contains('blogs')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('mansel')
      cy.get('#password').type('pass')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.get('#newBlog').click()
      cy.get('#title').type('Testi bloggaus')
      cy.get('#author').type('Blogisti')
      cy.get('#url').type('www.blogipostaus.fi')

      cy.get('#create-button').click()
      cy.get('.blog').contains('Testi bloggaus')
    })

    it('A blog can be liked', function () {
      cy.get('#newBlog').click()
      cy.get('#title').type('Liketys bloggaus')
      cy.get('#author').type('Blogisti')
      cy.get('#url').type('www.blogipostaus.fi')

      cy.get('#create-button').click()
      cy.get('#view-button').click()
      cy.contains('likes 0')
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })
    it('A blog can be deleted by creator', function () {
      cy.get('#newBlog').click()
      cy.get('#title').type('Poistettava bloggaus')
      cy.get('#author').type('Blogisti')
      cy.get('#url').type('www.blogipostaus.fi')

      cy.get('#create-button').click()
      cy.get('.blog').contains('Poistettava bloggaus')
      cy.get('#view-button').click()
      cy.get('#remove-button').click()
      cy.contains('.blog', 'Poistettava bloggaus').should('not.exist')
    })

    it('Blogs are sorted by likes', function () {
      cy.get('#newBlog').click()
      cy.get('#title').type('Yksi tykkäys')
      cy.get('#author').type('Blogisti')
      cy.get('#url').type('www.blogipostaus.fi')
      cy.get('#create-button').click()
      cy.get('#view-button').click()
      cy.contains('likes 0')
      cy.get('#like-button').click()
      cy.contains('likes 1')
      cy.get('#hide-button').click()
      cy.wait(500)
      cy.get('#newBlog').click()
      cy.get('#title').type('Kolme tykkäystä')
      cy.get('#author').type('Blogisti')
      cy.get('#url').type('www.blogipostaus.fi')
      cy.get('#create-button').click()
      cy.wait(500)
      cy.get('.blog').eq(1).find('#view-button').click()
      cy.contains('likes 0')
      cy.get('#like-button').click()
      cy.contains('likes 1')
      cy.get('#like-button').click()
      cy.contains('likes 2')
      cy.get('#like-button').click()
      cy.contains('likes 3')
      cy.get('#hide-button').click()
      cy.wait(500)

      cy.get('#newBlog').click()
      cy.get('#title').type('Kaksi tykkäystä')
      cy.get('#author').type('Blogisti')
      cy.get('#url').type('www.blogipostaus.fi')
      cy.get('#create-button').click()
      cy.wait(500)

      cy.get('.blog').eq(2).find('#view-button').click()
      cy.contains('likes 0')
      cy.get('#like-button').click()
      cy.contains('likes 1')
      cy.get('#like-button').click()
      cy.contains('likes 2')
      cy.get('#hide-button').click()
      cy.wait(500)

      cy.get('.blog').eq(0).should('contain', 'Kolme tykkäystä')
      cy.get('.blog').eq(1).should('contain', 'Kaksi tykkäystä')
      cy.get('.blog').eq(2).should('contain', 'Yksi tykkäys')
    })
  })
})
