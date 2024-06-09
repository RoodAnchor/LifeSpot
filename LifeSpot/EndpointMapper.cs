using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.IO;
using System.Text;

namespace LifeSpot
{
    public static class EndpointMapper
    {
        public static void MapImgs(this IEndpointRouteBuilder builder)
        {
            var cssFiles = new[] { 
                "img_1.jpg", 
                "img_2.jpg", 
                "img_3.jpg", 
                "img_4.jpg", 
                "img_5.jpg", 
                "img_6.jpg", 
                "img_7.jpg" 
            };

            foreach (var file in cssFiles)
            {
                builder.MapGet($"/Static/Img/{file}", async context =>
                {
                    var imgPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "Img", file);
                    await context.Response.SendFileAsync(imgPath);
                });
            }
        }

        public static void MapCss(this IEndpointRouteBuilder builder)
        {
            var cssFiles = new[] { "index.css", "about.css", "imageGallery.css" };

            foreach (var file in cssFiles)
            {
                builder.MapGet($"/Static/CSS/{file}", async context => 
                {
                    var cssPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "CSS", file);
                    var css = await File.ReadAllTextAsync(cssPath);
                    await context.Response.WriteAsync(css);
                });
            }
        }

        public static void MapJs(this IEndpointRouteBuilder builder)
        {
            var jsFiles = new[] { "main.js", "about.js", "testScript.js", "imageGallery.js" };

            foreach (var file in jsFiles)
            {
                builder.MapGet($"/Static/Scripts/{file}", async context =>
                {
                    var jsPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "Scripts", file);
                    var js = await File.ReadAllTextAsync(jsPath);
                    await context.Response.WriteAsync(js);
                });
            }
        }

        public static void MapHtml(this IEndpointRouteBuilder builder)
        {
            string footerHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "footer.html"));
            string sideBarHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "sideBar.html"));
            string imageGalleryHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "imageGallery.html"));

            builder.MapGet("/", async context =>
            {
                var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "index.html");
                var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                    .Replace("<!--SIDEBAR-->", sideBarHtml)
                    .Replace("<!--FOOTER-->", footerHtml);
                await context.Response.WriteAsync(html.ToString());
            });

            builder.MapGet("/about", async context =>
            {
                var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "about.html");
                var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                    .Replace("<!--SIDEBAR-->", sideBarHtml)
                    .Replace("<!--FOOTER-->", footerHtml)
                    .Replace("<!--IMAGE_GALLERY-->", imageGalleryHtml);
                await context.Response.WriteAsync(html.ToString());
            });

            builder.MapGet("/testing", async context =>
            {
                var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "testing.html");

                var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                    .Replace("<!--SIDEBAR-->", sideBarHtml)
                    .Replace("<!--FOOTER-->", footerHtml);

                await context.Response.WriteAsync(html.ToString());
            });
        }
    }
}
