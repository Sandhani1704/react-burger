describe('service is available', function () {
    it('should be available on localhost:3000', function () {
        cy.visit('http://localhost:3000');
    });

    it('the page must contain an empty burger constructor', () => {
        cy.contains('Переместите сюда ингредиенты для бургера.');
    });

    it("should click on the ingredient and open the modal window", () => {
        cy.get('[data-test-id="ingredient-item"]').eq(0).click();
        cy.get('[data-test-id="modal"]').contains('Детали ингредиента');
        cy.get('[data-test-id="modal"]').contains('Краторная булка N-200i');
    });

    it("should close the modal window by the close icon click", () => {
        cy.get('[data-test-id="close-icon"]').click();
        cy.contains('Детали ингредиента').should('not.exist')
    });

    it("should close the modal window by the overlay click", () => {
        cy.get('[data-test-id="ingredient-item"]').eq(2).click();
        cy.get('[data-test-id="modal-overlay"]').click(1, 1, { force: true });
        cy.contains('Детали ингредиента').should('not.exist')
    });

    const dragAndDropIngredients = () => {
        cy.get('[data-test-id="ingredient-item"]').eq(0).trigger('dragstart');
        cy.get('[data-test-id="burger-constructor"]').trigger('drop');
        cy.get('[data-test-id="ingredient-item"]').eq(2).trigger('dragstart');
        cy.get('[data-test-id="burger-constructor"]').trigger('drop');
        cy.get('[data-test-id="ingredient-item"]').eq(3).trigger('dragstart');
        cy.get('[data-test-id="burger-constructor"]').trigger('drop');
        cy.get('[data-test-id="ingredient-item"]').eq(7).trigger('dragstart');
        cy.get('[data-test-id="burger-constructor"]').trigger('drop');
        cy.get('[data-test-id="ingredient-item"]').eq(9).trigger('dragstart');
        cy.get('[data-test-id="burger-constructor"]').trigger('drop');
    }

    it('should get the order burger and open the order modal window', () => {
        dragAndDropIngredients();
        cy.get('[data-test-id="button-order"]').click();
        cy.get('.input_type_email').click()
        cy.get('[name=email]').type('angalkina1704@gmail.com');
        cy.get('[name=password]').type('123456');
        cy.get('[data-test-id="button-login"]').click();
        cy.get('[data-test-id="button-order"]').click();
        cy.wait(20000);
        cy.contains('Ваш заказ начали готовить');
        cy.get('[data-test-id="modal-overlay"]').click(1, 1, { force: true });
        cy.contains('Ваш заказ начали готовить').should('not.exist')
    });

});