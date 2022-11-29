# Fires Wild
## FPA-FOD-Plus Data Mapping Website

### Contributers
- David Adams
- Benjamin Collins
- Brenden Marks
- Jeremy Stocking
- Samuel Wasko


## Abstract

Our goal was to disply wildfire data graphically, and make the data easily and readily available for use. Visualizing the dataset can help minimize our impact on nature with repect to wildfires using data that was compiled by Dr. Mojtaba Sadegh and Yavar Pourmohamad.

This project has only 1 main page that the user will interact with. It contains a map and a filter pane. The end-user will be able to see two different visualizations. A heatmap, or points. The heatmap is a multicolor visualizer that will show red colors in areas of large fires, or an area where many fires have occured. When users zoom in or out, the heat map will change the heatmapping to show the area that is in view, and not the entire dataset. If a user wants to see individual fires, they can use the point view. Where each fire has a point, and can view the data that is associated with that fire. The user can then either download the entire dataset, or download the filtered dataset that they have chosen. 

Site admins will be able to use the Django admin center to add more data into the database that holds each fire record is stored in, and also manage existing records. Once added to the database, each fire will show up in the map.

## Description

We are using Docker containers to house each different component of the site. We are using three containers. Our frontend, backend, and database are hosted on them. The data is loading after the site is built, so the site can have data ready to read once the user loads the site. We have one page that visualizes the data. 

We do not allow the user to place all of the data in our database on the map due to performance issues that the user will experience when the map displays over 10,000 nodes in our point overlay. On the left are many different variables that the user can filter the map on. 

<img width="1792" alt="Screen Shot 2022-11-29 at 10 28 31 AM" src="https://user-images.githubusercontent.com/51347468/204600151-3487e1dd-c615-4230-8d43-ab5ded4214bc.png">

After the user filters the page, by default, the points overlay will be displayed on the map. An example is shown below. As an example we have filtered the data to fires in the state of Idaho in 2016. The radius of each point indicates the size of the fire. Users can click on each point to get some information on the fire, such as it's FOD and FPA IDs, along with the name the fire was given. Users can click on additional details to view much more data on the fire. 

<img width="1792" alt="Screen Shot 2022-11-29 at 10 39 04 AM" src="https://user-images.githubusercontent.com/51347468/204602788-b05b30f9-41c8-4fea-97fb-f6229dafd8f5.png">

The user can view fire data by using a heatmap. Which shows where there are a large amount, or large fires on the map. This view is localized, and will update as the user zooms in and out of the map. Below is an example using fires from California in 2016. 

<img width="1792" alt="Screen Shot 2022-11-29 at 10 43 50 AM" src="https://user-images.githubusercontent.com/51347468/204603929-904c1e11-f8ff-4e4d-9d96-42aa03d6a905.png">

When a user had filitered the data they want displayed on the map. They can download the data as a csv file, where they will get all of the data points that are available in the FPA-FOD-Plus dataset. Site admins can use the Django admin portal to add and modify data in the database. 
