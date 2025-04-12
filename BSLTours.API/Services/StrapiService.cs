using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using BSLTours.API.Models;
using System.Linq;


namespace BSLTours.API.Services;

public class StrapiService :IStrapiService
{
    private readonly HttpClient _httpClient;
    private readonly JsonSerializerOptions _jsonOptions;

    public StrapiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("https://graceful-happiness-10e3a700b4.strapiapp.com");
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "1fbd114f8cbcc4d58c1808af61b4c682a5337233075eb967b61118cc7861710ba9f9c63acd30dd025f1ecb3ec4259c4629eab0a4e7abcdf41d68cb80651dbbc0aac72cd9ecfe86b5eab8425acfdcb7c834215131e82eb6afb755c66e4a6261a71428987b733de4b26226f1a46343f9c548e7f21f76dce9d2678a338ba5d11c5e");

        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            PropertyNameCaseInsensitive = true
        };
    }

    public async Task<List<DestinationDto>> GetDestinationsAsync()
    {
        var query = "/api/destinations?" + StrapiQueryBuilder.GetDestinationPopulateQuery().TrimStart('&');

        var response = await _httpClient.GetAsync(query);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<StrapiResponse<List<DestinationDto>>>(content, _jsonOptions);

        return result?.Data ?? new List<DestinationDto>();
    }


    public async Task<DestinationDto?> GetDestinationBySlugAsync(string slug)
    {
        var query = $"/api/destinations?filters[slug][$eq]={Uri.EscapeDataString(slug)}" + StrapiQueryBuilder.GetDestinationPopulateQuery();

        var response = await _httpClient.GetAsync(query);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<StrapiResponse<List<DestinationDto>>>(content, _jsonOptions);

        return result?.Data?.FirstOrDefault();
    }

    public async Task<List<TourDto>> GetToursAsync()
    {
        var query = "/api/tours?" + StrapiQueryBuilder.GetTourPopulateQuery().TrimStart('&');

        var response = await _httpClient.GetAsync(query);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<StrapiResponse<List<TourDto>>>(content, _jsonOptions);

        return result?.Data ?? new List<TourDto>();
    }

    public async Task<TourDto?> GetTourBySlugAsync(string slug)
    {
        var query = $"/api/tours?filters[slug][$eq]={Uri.EscapeDataString(slug)}" + StrapiQueryBuilder.GetTourPopulateQuery();

        var response = await _httpClient.GetAsync(query);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<StrapiResponse<List<TourDto>>>(content, _jsonOptions);

        return result?.Data?.FirstOrDefault();
    }

    public async Task<List<TourDto>> GetFeaturedToursAsync()
    {
        var query = "api/tours?filters[featured][$eq]=true&populate[card][populate]=image";
        var response = await _httpClient.GetAsync(query);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<StrapiResponse<List<TourDto>>>(content, _jsonOptions);

        return result?.Data ?? new List<TourDto>();
    }
}

public class StrapiResponse<T>
{
    public T Data { get; set; }
}



public static class StrapiQueryBuilder
{
    public static string GetDestinationPopulateQuery()
    {
        return string.Join("",
            "&populate[overview][populate][image]=true",
            "&populate[subSections][populate][image]=true",
            "&populate[heroImage]=true",
            "&populate[featuresSection][populate][items][populate][image]=true",
            "&populate[galleryImages]=true",
            "&populate[faqs]=true",
            "&populate[quoteBlock]=true",
            "&populate[videoBlock]=true",
            "&populate[relatedTours][populate][image]=true",
            "&populate[nearbyAttractions][populate][image]=true",
            "&populate[essentialInfo]=true",
            "&populate[card][populate][image]=true"
        );
    }


    public static string GetBySlugQuery(string slug)
    {
        return $"/api/destinations?filters[slug][$eq]={Uri.EscapeDataString(slug)}" + GetDestinationPopulateQuery();
    }

    public static string GetAllDestinationsQuery()
    {
        return "/api/destinations" + GetDestinationPopulateQuery();
    }

    public static string GetTourPopulateQuery()
    {
        return string.Join("",
            "&populate[heroImage]=true",
            "&populate[galleryImages]=true",
            "&populate[itinerary][populate][image]=true",
            "&populate[relatedDestinations][populate][image]=true",
            "&populate[faqs]=true",
            "&populate[pricingTiers]=true",
            "&populate[optionalAddOns]=true",
            "&populate[card][populate][image]=true",
            "&populate[reviews]=true"
        );
    }

}
