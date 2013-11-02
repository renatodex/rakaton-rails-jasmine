describe("home controller tests", function() {
	beforeEach(function() {
		loadFixtures('home_index.html');
	})	
	
	describe("modal interactions", function() {	
		it("should load home_index fixture", function() {	
			var titulo_da_pagina = $('h1').html();
			expect(titulo_da_pagina).toBe('Rede de Farmácias Droga Zé')
		});

		it("should open modal when link is clicked", function() {
			Farmacy.events();	
			var explanation_link = $('.explanation-link');
			expect($('.explanation-modal')).toBeHidden();
			explanation_link.trigger('click');
			expect($('.explanation-modal')).toBeVisible();
		});
		
		it('should close modal when close link is clicked', function() {
			Farmacy.events();
			
			var explanation_link = $('.explanation-link');
			
			explanation_link.trigger('click')
			
			var close_link = $('.explanation-modal-close');
			
			close_link.trigger('click');
			
			expect($('.explanation-modal')).toBeHidden();
		});
	});
	
	describe("store open iteractions", function() {
		
		it("should have page data properties for store open iteractions", function() {
			expect($('.page-data').data('store-opened-url')).not.toBe(null)
		})
		
		it("should show an alert telling the user that the store is opened when opened=true", function() {
			var alert_spy = spyOn(window, 'alert').andReturn('')
			var ajax_spy = spyOn($, 'get').andReturn('')			
			
			Farmacy.events();
			
			var store_opened_button = $('.is-store-opened');
			store_opened_button.trigger('click');
			
			expect(ajax_spy.mostRecentCall.args[0]).toBe('/is-opened-store');
			expect($.param(ajax_spy.mostRecentCall.args[1])).toBe($.param({}));
			
			var callback = ajax_spy.mostRecentCall.args[2];	
			
			callback({ opened : true });
			
			expect(alert_spy.mostRecentCall.args[0]).toBe('Nossa loja está aberta, corra pra comprar!');
		})
	})
})