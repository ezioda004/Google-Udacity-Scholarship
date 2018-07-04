"use strict";
$(function () {

    //RSS Feeds test suite
    describe("RSS Feeds", () => {

        //Test for feed to be defined
        it("are defined", () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //Test for URL to be defined
        it("have url defined", () => {
            for (let feed of allFeeds) {
                expect(feed.hasOwnProperty("url") && feed.url.length !== 0).toBe(true);
            }
        });


        //Test for name to be defined
        it("have name defined", () => {
            for (let feed of allFeeds) {
                expect(feed.hasOwnProperty("name") && feed.name.length !== 0).toBe(true);
            }
        });
    });

    
    //Test suite for the menu
    describe("The menu", () => {
        const body = document.body;

        //Test to check if the meny is hidden by default
        it("is hidden by default", () => {
            expect(Array.from(body.classList).includes("menu-hidden")).toBe(true);
        });

        //Test to check if the menu visibilty changes on click
        it("changes visiblity when clicked", () => {
            const menuLink = document.querySelector(".menu-icon-link");
            menuLink.click();
            expect(Array.from(body.classList).includes("menu-hidden")).not.toBe(true);
            menuLink.click();
            expect(Array.from(body.classList).includes("menu-hidden")).toBe(true);
        });
    });


    //Test suite for the loadFeed function fetches the data correctly
    describe("Initial Entries", () => {

        //async request, therefore using callback
        beforeEach(done => {
            loadFeed(0, () => done());
        });

        //Test to check if the DOM has atleast 1 updated element
        it("should have atleast a single element", (done) => {
            expect(document.querySelectorAll(".feed .entry").length !== 0).toBe(true);
            done();
        })
    });


    //Test suite to check if Feed Selection works properly
    describe("New Feed Selection", () => {
        let nodeBefore;
        let nodeAfter;
        beforeEach(done => {
            loadFeed(0, () => {
                //getting the node before
                nodeBefore = document.querySelectorAll(".feed")[0].innerHTML;
                loadFeed(1, () => {
                    //getting the node afterwards
                    nodeAfter = document.querySelectorAll(".feed")[0].innerHTML;
                    done();
                });
            });


        });
        //checking if nodes are updated with different requests
        it("should load new content after loadFeed executes", done => {
            expect(nodeBefore === nodeAfter).toBe(false);
            done();
        })
    });
}());