import {test,expect, Page, Browser, chromium } from '@playwright/test';
let page : Page; 
let browser : Browser;
test.beforeAll(async () => {
    // Launch the browser and create a page before all tests
    browser = await chromium.launch();
    page = await browser.newPage();
});

test.afterAll(async () => {
    await browser.close();
});

test.beforeEach(async ()=>{
    await page.goto('https://www.amazon.com/');
    expect(page).toHaveURL('https://www.amazon.com/');
    expect (page).toHaveTitle('Amazon.com. Spend less. Smile more.');
    //flaky so removed
    //expect (page.getByRole('link', {name: 'Amazon', exact:true})).toBeVisible();
});
test.describe('Add items to cart',()=>{
  
    test('Search for the playstation 5', async () =>{
        const item = 'playstation 5';
        const searchWord = 'playstation'
        const idSearchBar = await page.getByPlaceholder('Search Amazon');
            //const value = idSearchBar? await idSearchBar.getAttribute('value'): null;
            const items = await page.$$('.a-size-medium.a-color-base.a-text-normal');
            const firstItem = items[0];
            const firstItemText = firstItem? await firstItem.textContent(): null;
          
            await idSearchBar?.fill(item);
            //expect (value).toBe(item);
            await idSearchBar.press('Enter');
            expect (page.url()).toMatch(new RegExp(searchWord));
    
        
        
            if (items.length > 0)
            {
                expect (firstItemText).toContain(item);
                await firstItem.click();
                expect (page.url).toMatch(new RegExp(searchWord));
            }
        
            const cart = await page.$('#nav-cart');
        
            await cart?.click();
            expect()
            
            

    
       
    })

    
})
