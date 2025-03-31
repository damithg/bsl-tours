using System;
using System.Collections.Generic;

namespace BSLTours.API.Models;

public class DestinationDto
{
    public int Id { get; set; }
    public string DocumentId { get; set; }
    public string Name { get; set; }
    public string Slug { get; set; }
    public string Excerpt { get; set; }
    public string ShortDescription { get; set; }
    public bool Featured { get; set; }
    public string Region { get; set; }
    public string Address { get; set; }
    public string Latitude { get; set; }
    public string Longitude { get; set; }
    public string RecommendedDuration { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime PublishedAt { get; set; }
    public OverviewDto Overview { get; set; }
    public List<SubSectionDto> SubSections { get; set; }
    public HeroImageDto HeroImage { get; set; }
    public FeaturesSectionDto FeaturesSection { get; set; }
    public List<GalleryImageDto> GalleryImages { get; set; }
    public List<FaqDto> Faqs { get; set; }
    public QuoteBlockDto QuoteBlock { get; set; }
    public VideoBlockDto VideoBlock { get; set; }
    public List<RelatedTourDto> RelatedTours { get; set; }
    public List<NearbyAttractionDto> NearbyAttractions { get; set; }
    public EssentialInfoDto EssentialInfo { get; set; }
    public CardImageDto CardImage { get; set; }
}



// Overview & SubSection
public class OverviewDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string FullDescription { get; set; }
    public CardDto Card { get; set; }
}

public class CardDto
{
    public CardImageDto Image { get; set; }
    public string Title { get; set; }           // Optional: override name
    public string Subtitle { get; set; }        // Optional: short line
    public string Tag { get; set; }             // Optional: e.g., "Surf", "Heritage", etc.
}

public class SubSectionDto : OverviewDto { }

// Image
public class ImageDto
{
    public int Id { get; set; }
    public string PublicId { get; set; }
    public string Alt { get; set; }
    public string Caption { get; set; }
    public string Orientation { get; set; }
}

// HeroImage
public class HeroImageDto : ImageDto { }


public class CardImageDto : ImageDto { }


// Features Section
public class FeaturesSectionDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public List<FeatureItemDto> Items { get; set; }
}

public class FeatureItemDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Icon { get; set; }
    public ImageDto Image { get; set; }
}

// Gallery Image
public class GalleryImageDto : ImageDto { }


// FAQ
public class FaqDto
{
    public int Id { get; set; }
    public string Question { get; set; }
    public string Answer { get; set; }
}

// Quote Block
public class QuoteBlockDto
{
    public int Id { get; set; }
    public string Content { get; set; }
    public string Author { get; set; }
}

// Video Block
public class VideoBlockDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string VideoUrl { get; set; }
}

// Related Tour
public class RelatedTourDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Slug { get; set; }
    public string Summary { get; set; }
    public string Duration { get; set; }
    public decimal StartingFrom { get; set; }
    public string Currency { get; set; }
    public string Link { get; set; }
    public ImageDto Image { get; set; }
}

// Nearby Attraction
public class NearbyAttractionDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Slug { get; set; }
    public string Description { get; set; }
    public string Distance { get; set; }
    public string Link { get; set; }
    public ImageDto Image { get; set; }
}

// Essential Info
public class EssentialInfoDto
{
    public int Id { get; set; }
    public string BestTimeToVisit { get; set; }
    public string NearestAirport { get; set; }
    public Dictionary<string, string> OpeningHours { get; set; }
    public List<string> TransportOptions { get; set; }
    public EntranceFees EntranceFees { get; set; }
    public List<string> Accessibility { get; set; }
    public List<string> TravelTips { get; set; }
    public List<string> Highlights { get; set; }
}

public class EntranceFees
{
    public Currency Currency { get; set; }
    public string LocalAdults { get; set; }
    public string ForeignAdults { get; set; }
    public string LocalChildren { get; set; }
    public string ForeignChildren { get; set; }
}

public class Currency
{
    public string Local { get; set; }
    public string Primary { get; set; }
}
