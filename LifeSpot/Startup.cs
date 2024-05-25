using System;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LifeSpot
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            String footerHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "footer.html"));
            String sideBarHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "sideBar.html"));

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "index.html");
                    var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                        .Replace("<!--SIDEBAR-->", sideBarHtml)
                        .Replace("<!--FOOTER-->", footerHtml);
                    await context.Response.WriteAsync(html.ToString());
                });

                endpoints.MapGet("/about", async context =>
                {
                    var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "about.html");
                    var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                        .Replace("<!--SIDEBAR-->", sideBarHtml)
                        .Replace("<!--FOOTER-->", footerHtml);
                    await context.Response.WriteAsync(html.ToString());
                });

                endpoints.MapGet("/testing", async context => 
                {
                    var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "testing.html");

                    var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                        .Replace("<!--SIDEBAR-->", sideBarHtml)
                        .Replace("<!--FOOTER-->", footerHtml);

                    await context.Response.WriteAsync(html.ToString());
                });

                endpoints.MapGet("/Static/CSS/index.css", async context =>
                {
                    var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "CSS", "index.css");
                    var css = await File.ReadAllTextAsync(viewPath);
                    await context.Response.WriteAsync(css);
                });

                endpoints.MapGet("/Static/CSS/about.css", async context =>
                {
                    var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "CSS", "about.css");
                    var css = await File.ReadAllTextAsync(viewPath);
                    await context.Response.WriteAsync(css);
                });

                endpoints.MapGet("/Static/Scripts/main.js", async context =>
                {
                    var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "Scripts", "main.js");
                    var js = await File.ReadAllTextAsync(viewPath);

                    context.Response.ContentType = "text/javascript";

                    await context.Response.WriteAsync(js);
                });

                endpoints.MapGet("/Static/Scripts/about.js", async context =>
                {
                    var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "Scripts", "about.js");
                    var js = await File.ReadAllTextAsync(viewPath);

                    context.Response.ContentType = "text/javascript";

                    await context.Response.WriteAsync(js);
                });

                endpoints.MapGet("/Static/Scripts/testScript.js", async context =>
                {
                    var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "Scripts", "testScript.js");
                    var js = await File.ReadAllTextAsync(viewPath);

                    context.Response.ContentType = "text/javascript";

                    await context.Response.WriteAsync(js);
                });
            });
        }
    }
}